import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const STORAGE_KEY = "hackmatrix_ps_launched";
const CUSTOM_EVENT_KEY = "hackmatrix_ps_event";
const FIRESTORE_DOC_PATH = ["settings", "problem_statements"] as const;

/** Read local initial state synchronously */
export function getInitialProblemStatus(): boolean {
  if (typeof window === "undefined") return true;
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached !== null) {
    return cached === "true";
  }
  return false; // Default to false (revoked) until launched by admin, or true if previously set
}

/** Subscribe to real-time status changes from Firestore, localStorage, and custom events */
export function subscribeProblemStatus(onChange: (launched: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  // Immediately notify listener of current value
  onChange(getInitialProblemStatus());

  // 1. Listen to Firestore real-time updates
  let unsubFirestore = () => {};
  try {
    const docRef = doc(db, FIRESTORE_DOC_PATH[0], FIRESTORE_DOC_PATH[1]);
    unsubFirestore = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (typeof data.launched === "boolean") {
            localStorage.setItem(STORAGE_KEY, String(data.launched));
            onChange(data.launched);
          }
        }
      },
      (err) => {
        console.warn("Firestore snapshot info (using local storage sync):", err?.message);
      }
    );
  } catch (e) {
    console.warn("Firestore init warning:", e);
  }

  // 2. Listen to localStorage updates across tabs/windows
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue !== null) {
      onChange(e.newValue === "true");
    }
  };

  // 3. Listen to same-window instant events
  const handleCustomEvent = (e: Event) => {
    const custom = e as CustomEvent<{ launched: boolean }>;
    if (custom.detail && typeof custom.detail.launched === "boolean") {
      onChange(custom.detail.launched);
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CUSTOM_EVENT_KEY, handleCustomEvent);

  return () => {
    unsubFirestore();
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CUSTOM_EVENT_KEY, handleCustomEvent);
  };
}

/** Update launch/revoke status in both Firestore and localStorage instantly */
export async function updateProblemStatus(launched: boolean): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(launched));
    // Dispatch cross-tab storage event
    window.dispatchEvent(new Event("storage"));
    // Dispatch same-window instant custom event
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_KEY, { detail: { launched } }));
  }

  // Non-blocking background Firestore write (with 1.5s timeout)
  try {
    const docRef = doc(db, FIRESTORE_DOC_PATH[0], FIRESTORE_DOC_PATH[1]);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firestore write timeout")), 1500)
    );
    await Promise.race([
      setDoc(docRef, { launched, updatedAt: new Date().toISOString() }, { merge: true }),
      timeoutPromise,
    ]);
  } catch (err) {
    console.warn("Firestore sync info (local state saved):", err);
  }
}
