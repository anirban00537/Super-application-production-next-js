import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");

  if (!verify && req.nextUrl.pathname.startsWith("/notes")) {
    return NextResponse.redirect("http://localhost:3001/login");
  }
}
