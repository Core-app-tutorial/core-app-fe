import ScrollOnTopButton from "@/components/atoms/scroll-on-top";
import Background from "@/components/organisms/background";
import AnimatedWaveFooter from "@/components/organisms/layout/main/footer";
import Navigation from "@/components/organisms/layout/main/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" text-gray-900 dark:text-white relative">
      <Background />
      <Navigation />
      <main className=" min-h-screen">{children}</main>
      <ScrollOnTopButton />
      <AnimatedWaveFooter />
    </div>
  );
}
