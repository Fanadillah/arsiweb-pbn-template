// ...existing code...
"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Users, BarChart, Globe } from "lucide-react";

const MOCK_POSTS = [
  { id: "p1", title: "How to Optimize Your Website", status: "Published", date: "2025-10-20", views: 234 },
  { id: "p2", title: "SEO Best Practices Guide", status: "Draft", date: "2025-10-18", views: 12 },
  { id: "p3", title: "PBN Setup Checklist", status: "Published", date: "2025-10-12", views: 87 },
  { id: "p4", title: "Content Templates for PBN", status: "Published", date: "2025-09-30", views: 42 },
];

export default function AdminDashboardPage() {
  const stats = useMemo(() => {
    const totalPosts = MOCK_POSTS.length;
    const published = MOCK_POSTS.filter(p => p.status === "Published").length;
    const drafts = totalPosts - published;
    const totalViews = MOCK_POSTS.reduce((s, p) => s + (p.views || 0), 0);
    return { totalPosts, published, drafts, totalViews };
  }, []);

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Overview — PBN Admin</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          New Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded"><FileText className="h-5 w-5 text-blue-600" /></div>
            <div>
              <p className="text-sm text-gray-600">Total Posts</p>
              <h3 className="text-2xl font-bold">{stats.totalPosts}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded"><Users className="h-5 w-5 text-green-600" /></div>
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <h3 className="text-2xl font-bold">{stats.published}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded"><BarChart className="h-5 w-5 text-purple-600" /></div>
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <h3 className="text-2xl font-bold">{stats.drafts}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded"><Globe className="h-5 w-5 text-orange-600" /></div>
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <h3 className="text-2xl font-bold">{stats.totalViews}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
        </div>
        <div className="p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Views</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_POSTS.map((post) => (
                <tr key={post.id} className="border-b last:border-0">
                  <td className="py-3">{post.title}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${post.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3">{post.date}</td>
                  <td className="py-3">{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// ...existing code...