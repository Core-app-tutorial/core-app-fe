import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/components/context/query-client-provider";
import { ThemeProvider } from "@/components/context/theme-provider";
import Background from "@/components/organisms/background";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/context/auth-context";
import { ScrollProvider } from "@/components/context/scroll-context";
import { SplashProvider } from "@/components/context/splash-provider";

const inter = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Core App - Best Mobile App for XYZ Features",
  description:
    "Core App helps you manage XYZ seamlessly with powerful features and smooth UI. Download now for free!",
  keywords: "Core App, mobile app, XYZ features, manage XYZ, best app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ReactQueryProviders>
          <AuthProvider>
            <ScrollProvider>
              <ThemeProvider>
                <Background />
                <SplashProvider>{children}</SplashProvider>
                <Toaster />
              </ThemeProvider>
            </ScrollProvider>
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
