import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const auhtRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = auhtRoutes.includes(path);

  const token = (await cookies()).get("accessToken")?.value;

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {};
