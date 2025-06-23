import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({
      success: false,
      message: "No access token found",
      accessToken: null,
    });
  } else {
    return NextResponse.json(
      {
        success: true,
        accessToken,
        message: "Access token found",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const { accessToken, refreshToken } = await req.json();

  const res = NextResponse.json({
    success: true,
    headers: { "Cache-Control": "no-store" },
  });

  res.cookies.set({
    name: "accessToken",
    value: accessToken,
    maxAge: 60 * 60,
    httpOnly: true,
    path: "/",
  });

  res.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    maxAge: 60 * 60,
    httpOnly: true,
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({
    success: true,
    headers: {
      "Cache-Control": "no-store",
    },
  });

  res.cookies.delete({
    name: "accessToken",
  });

  res.cookies.delete({
    name: "refreshToken",
  });

  return res;
}
