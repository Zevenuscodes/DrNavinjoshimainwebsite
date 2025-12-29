"use client";

/**
 * Media Manager Page
 * 
 * Allows admin to upload, preview, and manage images.
 * Images can be reused across courses and homepage.
 */

import { useState, useRef } from "react";
import { FiUpload, FiX, FiCopy } from "react-icons/fi";
import Image from "next/image";

interface MediaFile {
  url: string;
  name: string;
  uploadedAt?: Date;
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "media");
      
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        setMediaFiles((prev) => [
          {
            url: data.url,
            name: file.name,
            uploadedAt: new Date(),
          },
          ...prev,
        ]);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }
  
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          handleUpload(file);
        } else {
          alert(`${file.name} is not an image file`);
        }
      });
    }
  }
  
  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    alert("Image URL copied to clipboard!");
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Manager</h1>
          <p className="text-gray-600">Upload and manage images</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-herbal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-herbal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <FiUpload />
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8 cursor-pointer hover:border-herbal-500 transition-colors"
      >
        <FiUpload className="text-4xl text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Click to upload or drag and drop images here
        </p>
        <p className="text-sm text-gray-500">
          PNG, JPG, GIF up to 5MB
        </p>
      </div>
      
      {/* Media Grid */}
      {mediaFiles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-soft p-12 text-center">
          <p className="text-gray-600">No images uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaFiles.map((file, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-soft overflow-hidden group relative"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                  onClick={() => setSelectedImage(file.url)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(file.url);
                    }}
                    className="bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100"
                    title="Copy URL"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-600 truncate">{file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100 z-10"
            >
              <FiX className="text-2xl" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Preview"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] rounded-lg"
              />
            </div>
            <div className="mt-4 bg-white rounded-lg p-4">
              <button
                onClick={() => copyToClipboard(selectedImage)}
                className="bg-herbal-600 text-white px-4 py-2 rounded-lg hover:bg-herbal-700 transition-colors flex items-center gap-2"
              >
                <FiCopy />
                Copy Image URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


