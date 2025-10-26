// app/(dashboard)/admin/layout.tsx
"use client"
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
