"use client";

/**
 * Conditional Layout Wrapper
 * 
 * Conditionally renders Navbar and Footer based on the current route.
 * Excludes admin routes from showing Navbar/Footer.
 */

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || false;
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "" : "min-h-screen"}>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}


