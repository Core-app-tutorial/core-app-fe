import SplashWrapper from "@/components/providers/splash-wrapper";
import { cookies } from "next/headers";

async function getHasSeenSplash() {
  const cookieStore = await cookies();
  return cookieStore.get("hasSeenSplash")?.value === "true";
}

export default async function HomePage() {
  const hasSeenSplash = await getHasSeenSplash();

  if (!hasSeenSplash) {
    // Chưa xem splash: render splash wrapper client component với nội dung con là main content
    return (
      <SplashWrapper>
        <MainContent />
      </SplashWrapper>
    );
  }

  // Đã xem splash, render content luôn
  return <MainContent />;
}

function MainContent() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Chào mừng đến với trang chính!</h1>
      <p>Đây là nội dung chính sau splash.</p>
    </main>
  );
}
