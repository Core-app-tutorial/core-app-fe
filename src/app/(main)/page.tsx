import SplashWrapper from "@/components/providers/splash-wrapper";
import Section from "@/components/screen/home/section";
import { cookies } from "next/headers";

async function getHasSeenSplash() {
  const cookieStore = await cookies();
  return cookieStore.get("hasSeenSplash")?.value === "true";
}

export default async function HomePage() {
  const hasSeenSplash = await getHasSeenSplash();

  if (!hasSeenSplash) {
    return (
      <SplashWrapper>
        <MainContent />
      </SplashWrapper>
    );
  }

  return <MainContent />;
}

function MainContent() {
  return (
    <main className="p-8">
      <Section />
      <Section />
      <Section />
    </main>
  );
}
