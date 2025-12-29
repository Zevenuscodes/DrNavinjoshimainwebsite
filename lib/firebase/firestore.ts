/**
 * Firestore Database Utilities
 * 
 * Provides typed functions for interacting with Firestore collections:
 * - courses: Course management
 * - homepage: Homepage content management
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config";

// ==================== TYPES ====================

export interface Course {
  id?: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  imageURL: string;
  createdAt?: Date;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  slideshowImages: { src: string; alt: string }[]; // Array of slideshow images
}

// ==================== COURSES ====================

const COURSES_COLLECTION = "courses";

/**
 * Get all courses
 */
export async function getCourses(): Promise<Course[]> {
  const coursesRef = collection(db, COURSES_COLLECTION);
  const q = query(coursesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Course;
  });
}

/**
 * Get a single course by ID
 */
export async function getCourse(id: string): Promise<Course | null> {
  const courseRef = doc(db, COURSES_COLLECTION, id);
  const snapshot = await getDoc(courseRef);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
  } as Course;
}

/**
 * Create a new course
 */
export async function createCourse(course: Omit<Course, "id" | "createdAt">): Promise<string> {
  const coursesRef = collection(db, COURSES_COLLECTION);
  const docRef = await addDoc(coursesRef, {
    ...course,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Update an existing course
 */
export async function updateCourse(id: string, course: Partial<Omit<Course, "id" | "createdAt">>): Promise<void> {
  const courseRef = doc(db, COURSES_COLLECTION, id);
  await updateDoc(courseRef, course);
}

/**
 * Delete a course
 */
export async function deleteCourse(id: string): Promise<void> {
  const courseRef = doc(db, COURSES_COLLECTION, id);
  await deleteDoc(courseRef);
}

// ==================== HOMEPAGE ====================

const HOMEPAGE_COLLECTION = "homepage";
const HOMEPAGE_DOC_ID = "content"; // Single document for homepage content

/**
 * Get homepage content
 */
export async function getHomepageContent(): Promise<HomepageContent | null> {
  const homepageRef = doc(db, HOMEPAGE_COLLECTION, HOMEPAGE_DOC_ID);
  const snapshot = await getDoc(homepageRef);
  
  if (!snapshot.exists()) {
    // Return default content if document doesn't exist
    return {
      heroTitle: "Welcome to Dr. Navin Joshi",
      heroSubtitle: "Ayurvedic Healing & Wellness",
      heroImage: "",
      aboutText: "About section content...",
      slideshowImages: [
        { src: "/drnavinmain.jpg", alt: "Dr. Navin Joshi" },
        { src: "/pic2.jpg", alt: "Clinic photo" },
        { src: "/pic3.jpg", alt: "Workshop photo" },
      ],
    };
  }
  
  return snapshot.data() as HomepageContent;
}

/**
 * Update homepage content
 */
export async function updateHomepageContent(content: Partial<HomepageContent>): Promise<void> {
  const homepageRef = doc(db, HOMEPAGE_COLLECTION, HOMEPAGE_DOC_ID);
  const snapshot = await getDoc(homepageRef);
  
  if (snapshot.exists()) {
    await updateDoc(homepageRef, content);
  } else {
    // Create document if it doesn't exist using setDoc with specific ID
    await setDoc(homepageRef, {
      heroTitle: content.heroTitle || "",
      heroSubtitle: content.heroSubtitle || "",
      heroImage: content.heroImage || "",
      aboutText: content.aboutText || "",
      slideshowImages: content.slideshowImages || [
        { src: "/drnavinmain.jpg", alt: "Dr. Navin Joshi" },
        { src: "/pic2.jpg", alt: "Clinic photo" },
        { src: "/pic3.jpg", alt: "Workshop photo" },
      ],
    });
  }
}

