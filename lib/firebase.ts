import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3dMflKEz0tO4oA3MfvzUci7qIR3rja5w",
  authDomain: "hackmatrix-d251a.firebaseapp.com",
  projectId: "hackmatrix-d251a",
  storageBucket: "hackmatrix-d251a.firebasestorage.app",
  messagingSenderId: "156076574825",
  appId: "1:156076574825:web:0008a2eb5b458d08db3af8"
};

// Initialize Firebase (SSR-safe singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export Firestore database reference
export const db = getFirestore(app);

// Firebase Auth, created lazily so it never runs during the static prerender.
// Call this only from the browser (effects / event handlers).
let _auth: Auth | null = null;
export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(app);
  return _auth;
}

// Helper for client-side Firebase Analytics initialization
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
