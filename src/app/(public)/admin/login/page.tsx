"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginAdmin(email, password);
      console.log("Login successful");
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError("Email atau password salah!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 border rounded-md shadow-sm bg-card"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>

        <div className="mb-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="•••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Memproses..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
