"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings } from "lucide-react";

const menuItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/posts", icon: FileText, label: "Posts" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                "hover:bg-gray-100 active:bg-gray-200",
                                isActive 
                                    ? "bg-blue-50 text-blue-600" 
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            <Icon size={20} className={cn(
                                isActive ? "text-blue-600" : "text-gray-500"
                            )} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}