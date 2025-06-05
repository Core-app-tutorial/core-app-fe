import ScrollOnTopButton from "@/components/atoms/scroll-on-top";
import AnimatedWaveFooter from "@/components/organisms/footer";
import Navigation from "@/components/organisms/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" text-gray-900 dark:text-white relative">
      <Navigation />
      <main className="mt-16 min-h-screen">{children}</main>
      <ScrollOnTopButton />
      <AnimatedWaveFooter />
    </div>
  );
}
