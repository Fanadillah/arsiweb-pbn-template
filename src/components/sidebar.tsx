"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings } from "lucide-react";

const menuItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dasboard"},
    { href: "/admin/posts", icon:FileText, label: "Posts" },
    { href: "/admin/settings", icon: Settings, label: "Settings"},
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-6 border-r bg-muted/40 hidden md:flex flex-col">
        <div className="p-4 text-xl font-bold">Admin Panel</div>
        <nav className="flex-1">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition",
                            pathname === item.href && "bg-accent text-accent-foreground"
                        )}
                    >
                        <Icon size={18 }/>
                        {item.label}
                    </Link>
                );
            })}
        </nav>
        </aside>
    );
}