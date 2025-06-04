import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "hasSeenSplash",
    value: "true",
    path: "/",
    maxAge: 30, // 30 giây
  });
  return response;
}
