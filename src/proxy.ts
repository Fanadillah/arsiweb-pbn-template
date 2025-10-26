// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const user = req.cookies.get("firebase:authUser"); // nanti kita set session di client
  const url = req.nextUrl;

  if (!user && url.pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
