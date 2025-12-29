/**
 * Admin Layout
 * 
 * Wraps all admin pages with sidebar navigation.
 * Excludes login page from this layout (handled by route structure).
 */

"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  
  // Don't show sidebar on login page
  if (isLoginPage) {
    return <>{children}</>;
  }
  
  // Show sidebar for all other admin pages (after login)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

