/**
 * Authentication Utilities
 * 
 * Handles admin authentication with email whitelist check.
 * Only whitelisted admin emails can access the admin panel.
 */

import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
  Auth
} from "firebase/auth";
import { auth } from "./config";

/**
 * Whitelist of admin emails
 * In production, consider storing this in Firestore or environment variables
 */
const ADMIN_EMAILS = [
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@drnavinjoshi.com",
  // Add more admin emails here
];

/**
 * Check if an email is whitelisted as admin
 */
export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

/**
 * Sign in with email and password
 * Returns user if successful, throws error if not admin or invalid credentials
 */
export async function signIn(email: string, password: string): Promise<User> {
  try {
    // Check if auth is properly initialized
    if (!auth) {
      throw new Error("Firebase Auth is not initialized. Please check your configuration.");
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Verify admin email
    if (!user.email || !isAdminEmail(user.email)) {
      await firebaseSignOut(auth);
      throw new Error("Access denied. Admin email required.");
    }
    
    return user;
  } catch (error: any) {
    // Handle Firebase Auth errors
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      throw new Error("Invalid email or password.");
    }
    if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email format.");
    }
    if (error.code === "auth/invalid-api-key" || error.code === "auth/configuration-not-found") {
      throw new Error("Firebase configuration error. Please check your environment variables.");
    }
    if (error.code === "auth/network-request-failed") {
      throw new Error("Network error. Please check your internet connection.");
    }
    // Re-throw with original message if it's already a user-friendly error
    if (error.message && !error.code) {
      throw error;
    }
    throw new Error(error.message || "Login failed. Please try again.");
  }
}

/**
 * Sign in with Google
 * Returns user if successful, throws error if not admin
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Verify admin email
    if (!user.email || !isAdminEmail(user.email)) {
      await firebaseSignOut(auth);
      throw new Error("Access denied. Admin email required.");
    }
    
    return user;
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in cancelled.");
    }
    if (error.code === "auth/popup-blocked") {
      throw new Error("Popup blocked. Please allow popups and try again.");
    }
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Check if current user is authenticated and is admin
 */
export function isAdmin(): boolean {
  const user = auth.currentUser;
  return user !== null && user.email !== null && isAdminEmail(user.email);
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email && isAdminEmail(user.email)) {
      callback(user);
    } else {
      callback(null);
    }
  });
}


