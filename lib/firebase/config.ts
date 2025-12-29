/**
 * Firebase Configuration
 * 
 * This file initializes Firebase for client-side usage.
 * Environment variables should be set in .env.local:
 * - NEXT_PUBLIC_FIREBASE_API_KEY
 * - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 * - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 * - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 * - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 * - NEXT_PUBLIC_FIREBASE_APP_ID
 */

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase config
function isValidFirebaseConfig(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId &&
    firebaseConfig.apiKey !== "dummy" &&
    firebaseConfig.projectId !== "dummy"
  );
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | null = null;

if (getApps().length === 0) {
  // Only initialize if we have valid config
  if (isValidFirebaseConfig()) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase initialization error:", error);
      throw new Error("Failed to initialize Firebase. Please check your configuration.");
    }
  } else {
    // During build time or if config is missing, we might not have env vars
    // But we should throw an error in runtime if config is invalid
    if (typeof window !== "undefined") {
      // Client-side: throw error if config is missing
      console.error("Firebase configuration is missing or invalid. Please check your .env.local file.");
      throw new Error("Firebase configuration is missing. Please set up your environment variables.");
    }
    // Server-side build: create dummy app to prevent build errors
    app = initializeApp({
      apiKey: "dummy",
      authDomain: "dummy",
      projectId: "dummy",
      storageBucket: "dummy",
      messagingSenderId: "dummy",
      appId: "dummy",
    });
  }
} else {
  app = getApps()[0];
}

// Initialize services (only if app is valid)
if (!app) {
  throw new Error("Firebase app is not initialized. Please check your configuration.");
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;


