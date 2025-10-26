// ...existing code...
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !user) {
      router.replace("/admin/login");
    }
  }, [user, initialized, router]);

  if (loading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
// ...existing code...