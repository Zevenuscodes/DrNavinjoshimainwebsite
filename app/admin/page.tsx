"use client";

/**
 * Admin Dashboard Overview
 * 
 * Main dashboard page showing statistics and quick actions.
 */

import { useEffect, useState } from "react";
import { FiBook, FiHome, FiImage, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    homepageUpdated: false,
    mediaCount: 0,
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch courses count
        const coursesRes = await fetch("/api/admin/courses");
        if (coursesRes.ok) {
          const data = await coursesRes.json();
          setStats((prev) => ({ ...prev, courses: data.courses?.length || 0 }));
        }
        
        // Fetch homepage content to check last update
        const homepageRes = await fetch("/api/admin/homepage");
        if (homepageRes.ok) {
          setStats((prev) => ({ ...prev, homepageUpdated: true }));
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);
  
  const quickActions = [
    {
      title: "Add New Course",
      description: "Create a new course",
      href: "/admin/courses?action=create",
      icon: <FiBook />,
      color: "bg-blue-500",
    },
    {
      title: "Edit Homepage",
      description: "Update homepage content",
      href: "/admin/homepage",
      icon: <FiHome />,
      color: "bg-green-500",
    },
    {
      title: "Upload Media",
      description: "Add new images",
      href: "/admin/media",
      icon: <FiImage />,
      color: "bg-purple-500",
    },
  ];
  
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to the admin panel</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Courses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.courses}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiBook className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Homepage Status</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.homepageUpdated ? "Active" : "Pending"}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiHome className="text-2xl text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Media Files</p>
              <p className="text-3xl font-bold text-gray-900">{stats.mediaCount}+</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiImage className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-lg shadow-soft p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-600">Activity log will appear here</p>
      </div>
    </div>
  );
}
