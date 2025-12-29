/**
 * Firebase Storage Utilities
 * 
 * Handles image uploads to Firebase Storage for courses and homepage.
 */

import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { storage } from "./config";

/**
 * Upload an image file to Firebase Storage
 * @param file - File to upload
 * @param path - Storage path (e.g., "courses/image.jpg" or "homepage/hero.jpg")
 * @returns Download URL of uploaded file
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }
  
  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error("Image size must be less than 5MB");
  }
  
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Delete an image from Firebase Storage
 * @param url - Full download URL of the image to delete
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract path from URL
    const urlObj = new URL(url);
    const path = decodeURIComponent(urlObj.pathname.split("/o/")[1].split("?")[0]);
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}

/**
 * Get all images from a storage folder
 * @param folderPath - Path to folder (e.g., "media" or "courses")
 * @returns Array of download URLs
 */
export async function listImages(folderPath: string): Promise<string[]> {
  const folderRef = ref(storage, folderPath);
  const result = await listAll(folderRef);
  
  const urls = await Promise.all(
    result.items.map(async (itemRef) => {
      return await getDownloadURL(itemRef);
    })
  );
  
  return urls;
}

/**
 * Upload course image
 */
export async function uploadCourseImage(file: File, courseId?: string): Promise<string> {
  const timestamp = Date.now();
  const fileName = courseId 
    ? `courses/${courseId}-${timestamp}-${file.name}`
    : `courses/${timestamp}-${file.name}`;
  return uploadImage(file, fileName);
}

/**
 * Upload homepage image
 */
export async function uploadHomepageImage(file: File, imageType: "hero" | "about"): Promise<string> {
  const timestamp = Date.now();
  const fileName = `homepage/${imageType}-${timestamp}-${file.name}`;
  return uploadImage(file, fileName);
}

/**
 * Upload media library image
 */
export async function uploadMediaImage(file: File): Promise<string> {
  const timestamp = Date.now();
  const fileName = `media/${timestamp}-${file.name}`;
  return uploadImage(file, fileName);
}


