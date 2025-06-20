import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/components/providers/query-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Background from "@/components/organisms/background";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/context/auth-context";

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
            <Background />
            <ThemeProvider>{children}</ThemeProvider>
            <Toaster />
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
