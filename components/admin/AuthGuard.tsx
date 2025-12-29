"use client";

/**
 * Client-Side Auth Guard Component
 * 
 * Protects admin pages on the client side by checking authentication state.
 * Redirects to login if not authenticated.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, onAuthChange } from "@/lib/firebase/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check initial auth state
    if (isAdmin()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
    
    // Subscribe to auth changes
    const unsubscribe = onAuthChange((user) => {
      if (user && isAdmin()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    });
    
    return () => unsubscribe();
  }, [router]);
  
  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herbal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }
  
  // Only render children if authenticated
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
}


