import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    headers: { "Cache-Control": "no-store" },
  });
  response.cookies.set({
    name: "hasSeenSplash",
    value: "true",
    path: "/",
    maxAge: 30, // 30 giây
  });
  return response;
}

export async function GET() {
  const cookieStore = await cookies();
  const hasSeenSplash = cookieStore.get("hasSeenSplash")?.value === "true";
  return NextResponse.json({
    hasSeenSplash,
    headers: { "Cache-Control": "no-store" },
  });
}
