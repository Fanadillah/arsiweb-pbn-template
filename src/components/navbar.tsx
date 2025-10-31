"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/api/AuthContext";
import { useRouter } from "next/navigation";
import { Bell, Search, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        
        {/* Search bar */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder:text-gray-400 w-48"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User menu */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-700">
              {user?.email?.split('@')[0] || 'Admin'}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full w-9 h-9 bg-gray-100"
            onClick={handleLogout}
          >
            <User size={18} className="text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}