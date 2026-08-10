import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const STORAGE_KEY = "hackmatrix_ps_launched";
const FIRESTORE_DOC_PATH = ["settings", "problem_statements"] as const;

/** Read local initial state synchronously */
export function getInitialProblemStatus(): boolean {
  if (typeof window === "undefined") return true;
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached !== null) {
    return cached === "true";
  }
  return true; // default to true (launched)
}

/** Subscribe to real-time status changes from Firestore and localStorage */
export function subscribeProblemStatus(onChange: (launched: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  // 1. Listen to Firestore real-time updates
  let unsubFirestore = () => {};
  try {
    const docRef = doc(db, FIRESTORE_DOC_PATH[0], FIRESTORE_DOC_PATH[1]);
    unsubFirestore = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (typeof data.launched === "boolean") {
          localStorage.setItem(STORAGE_KEY, String(data.launched));
          onChange(data.launched);
        }
      }
    }, (err) => {
      console.warn("Firestore snapshot error (using local storage fallback):", err);
    });
  } catch (e) {
    console.warn("Firestore init warning:", e);
  }

  // 2. Listen to localStorage updates across tabs/windows
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue !== null) {
      onChange(e.newValue === "true");
    }
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    unsubFirestore();
    window.removeEventListener("storage", handleStorage);
  };
}

/** Update launch/revoke status in both Firestore and localStorage */
export async function updateProblemStatus(launched: boolean): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(launched));
    window.dispatchEvent(new Event("storage"));
  }

  try {
    const docRef = doc(db, FIRESTORE_DOC_PATH[0], FIRESTORE_DOC_PATH[1]);
    await setDoc(docRef, { launched, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("Firestore write fallback to local storage:", err);
  }
}
