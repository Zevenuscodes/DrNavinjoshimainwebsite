"use client";

/**
 * Course Management Page
 * 
 * Allows admin to create, edit, and delete courses.
 * Integrates with Firestore and Firebase Storage.
 */

import { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import Image from "next/image";
import type { Course } from "@/lib/firebase/firestore";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    imageURL: "",
  });
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  async function fetchCourses() {
    try {
      const res = await fetch("/api/admin/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleImageUpload(file: File, courseId?: string) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "course");
      if (courseId) {
        formData.append("courseId", courseId);
      }
      
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, imageURL: data.url }));
        return data.url;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
      throw error;
    } finally {
      setUploading(false);
    }
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const courseData = {
        ...formData,
        price: Number(formData.price),
      };
      
      let res;
      if (editingCourse) {
        // Update existing course
        res = await fetch("/api/admin/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCourse.id, ...courseData }),
        });
      } else {
        // Create new course
        res = await fetch("/api/admin/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });
      }
      
      const data = await res.json();
      if (res.ok) {
        await fetchCourses();
        setShowModal(false);
        resetForm();
      } else {
        alert(data.error || "Failed to save course");
      }
    } catch (error: any) {
      alert(error.message || "Failed to save course");
    }
  }
  
  async function handleDelete(courseId: string) {
    if (!confirm("Are you sure you want to delete this course?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/courses?id=${courseId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        await fetchCourses();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete course");
      }
    } catch (error) {
      alert("Failed to delete course");
    }
  }
  
  function handleEdit(course: Course) {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price.toString(),
      imageURL: course.imageURL,
    });
    setShowModal(true);
  }
  
  function resetForm() {
    setFormData({
      title: "",
      description: "",
      duration: "",
      price: "",
      imageURL: "",
    });
    setEditingCourse(null);
  }
  
  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Courses</h1>
          <p className="text-gray-600">Create, edit, and manage courses</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-herbal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-herbal-700 transition-colors flex items-center gap-2"
        >
          <FiPlus />
          Add New Course
        </button>
      </div>
      
      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-soft p-12 text-center">
          <p className="text-gray-600 mb-4">No courses yet</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-herbal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-herbal-700 transition-colors"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-soft overflow-hidden"
            >
              {course.imageURL && (
                <div className="relative w-full h-48">
                  <Image
                    src={course.imageURL}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-herbal-600 font-semibold">
                    ₹{course.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {course.duration}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => course.id && handleDelete(course.id)}
                    className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    required
                    placeholder="e.g., 4 weeks"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Image *
                </label>
                {formData.imageURL && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={formData.imageURL}
                      alt="Course preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, editingCourse?.id);
                    }
                  }}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                />
                {uploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                )}
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-herbal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-herbal-700 transition-colors disabled:opacity-50"
                >
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


