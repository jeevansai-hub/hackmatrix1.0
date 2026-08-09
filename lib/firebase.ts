import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQiwzd5BfxBepQ6bLMY7C8i2zCTtL5Uq8",
  authDomain: "matrixhack-b499f.firebaseapp.com",
  projectId: "matrixhack-b499f",
  storageBucket: "matrixhack-b499f.firebasestorage.app",
  messagingSenderId: "840169251232",
  appId: "1:840169251232:web:103013dd35ee98690c04c5"
};

// Initialize Firebase (SSR-safe singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export Firestore database reference
export const db = getFirestore(app);

// Helper for client-side Firebase Analytics initialization
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
