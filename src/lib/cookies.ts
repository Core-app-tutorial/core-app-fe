import { cookies } from "next/headers";

export async function hasSeenSplashCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("hasSeenSplash")?.value === "true";
}
