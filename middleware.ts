import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");

  if (!verify && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect("http://localhost:3001/login");
  }

  //   if (verify && url === "http://localhost:3000/") {
  //     return NextResponse.redirect("http://localhost:3000/dashboard");
  //   }
}
