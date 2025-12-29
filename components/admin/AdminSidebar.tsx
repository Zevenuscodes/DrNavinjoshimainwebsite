"use client";

/**
 * Admin Sidebar Navigation Component
 * 
 * Provides navigation for the admin dashboard.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiLayout, 
  FiBook, 
  FiHome, 
  FiImage, 
  FiLogOut 
} from "react-icons/fi";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard Overview", icon: <FiLayout /> },
  { href: "/admin/courses", label: "Manage Courses", icon: <FiBook /> },
  { href: "/admin/homepage", label: "Homepage Content", icon: <FiHome /> },
  { href: "/admin/media", label: "Media Manager", icon: <FiImage /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      const { signOut } = await import("@/lib/firebase/auth");
      await signOut();
      
      // Clear session cookie
      await fetch("/api/admin/auth/logout", { method: "POST" });
      
      // Redirect to homepage (user-facing page)
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      // Even on error, redirect to homepage
      window.location.href = "/";
    }
  };
  
  return (
    <aside className="w-64 bg-herbal-800 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-herbal-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-herbal-300 mt-1">Dr. Navin Joshi</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-herbal-700 text-white"
                      : "text-herbal-200 hover:bg-herbal-700/50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-herbal-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-herbal-200 hover:bg-herbal-700 transition-colors"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

