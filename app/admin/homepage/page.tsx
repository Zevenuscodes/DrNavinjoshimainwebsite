"use client";

/**
 * Homepage Content Management Page
 * 
 * Allows admin to edit homepage content including hero section and about text.
 */

import { useEffect, useState } from "react";
import { FiSave, FiUpload, FiPlus, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import type { HomepageContent } from "@/lib/firebase/firestore";

export default function HomepagePage() {
  const [content, setContent] = useState<HomepageContent>({
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    aboutText: "",
    slideshowImages: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  
  useEffect(() => {
    fetchContent();
  }, []);
  
  async function fetchContent() {
    try {
      const res = await fetch("/api/admin/homepage");
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || {
          heroTitle: "",
          heroSubtitle: "",
          heroImage: "",
          aboutText: "",
          slideshowImages: [],
        });
      }
    } catch (error) {
      console.error("Error fetching homepage content:", error);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleImageUpload(file: File, imageType: "hero" | "about" | "slideshow") {
    setUploading(imageType);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "homepage");
      formData.append("imageType", imageType === "slideshow" ? "hero" : imageType);
      
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        if (imageType === "hero") {
          setContent((prev) => ({ ...prev, heroImage: data.url }));
        } else if (imageType === "slideshow") {
          // Add to slideshow images
          const alt = file.name.replace(/\.[^/.]+$/, ""); // Use filename as alt
          setContent((prev) => ({
            ...prev,
            slideshowImages: [...(prev.slideshowImages || []), { src: data.url, alt }],
          }));
        } else {
          setContent((prev) => ({ ...prev, heroImage: data.url }));
        }
        return data.url;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
      throw error;
    } finally {
      setUploading(null);
    }
  }
  
  function removeSlideshowImage(index: number) {
    setContent((prev) => ({
      ...prev,
      slideshowImages: prev.slideshowImages?.filter((_, i) => i !== index) || [],
    }));
  }
  
  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert("Homepage content saved successfully!");
      } else {
        alert(data.error || "Failed to save content");
      }
    } catch (error: any) {
      alert(error.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Homepage Content
          </h1>
          <p className="text-gray-600">Manage your homepage content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-herbal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-herbal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <FiSave />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Hero Section
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title *
              </label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) =>
                  setContent({ ...content, heroTitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                placeholder="Welcome to Dr. Navin Joshi"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subtitle *
              </label>
              <input
                type="text"
                value={content.heroSubtitle}
                onChange={(e) =>
                  setContent({ ...content, heroSubtitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                placeholder="Ayurvedic Healing & Wellness"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image *
              </label>
              {content.heroImage && (
                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={content.heroImage}
                    alt="Hero preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, "hero");
                    }
                  }}
                  disabled={uploading === "hero"}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                />
                {uploading === "hero" && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Slideshow Section */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Hero Slideshow Images
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Slideshow Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, "slideshow");
                    }
                  }}
                  disabled={uploading === "slideshow"}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
                />
                {uploading === "slideshow" && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
            </div>
            
            {content.slideshowImages && content.slideshowImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {content.slideshowImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeSlideshowImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => {
                        const updated = [...(content.slideshowImages || [])];
                        updated[index] = { ...updated[index], alt: e.target.value };
                        setContent({ ...content, slideshowImages: updated });
                      }}
                      className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder="Image alt text"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            About Section
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Text *
            </label>
            <textarea
              value={content.aboutText}
              onChange={(e) =>
                setContent({ ...content, aboutText: e.target.value })
              }
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-herbal-500 focus:border-transparent"
              placeholder="Enter about section content..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

