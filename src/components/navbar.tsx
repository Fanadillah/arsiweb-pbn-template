"use client";

import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-background/70 backdrop-blur-md">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
