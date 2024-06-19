import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

export async function middleware(request) {
  const token =
    request && request.cookies ? request.cookies.get("token")?.value : null;
  const userId = await verifyToken(token);
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/login") ||
    userId ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }

  if ((!token || !userId) && pathname !== "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
