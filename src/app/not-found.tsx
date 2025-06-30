import Container from "@/components/atoms/layout/container";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = async () => {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;

  return (
    <Container className="bg-background">
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-muted rounded-full particle animation-delay-200"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-muted-foreground/30 rounded-full particle animation-delay-400"></div>
        <div className="absolute bottom-32 left-16 w-2.5 h-2.5 bg-muted rounded-full particle animation-delay-600"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-muted-foreground/40 rounded-full particle animation-delay-800"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 space-y-8">
        {/* Image with 400 overlay */}
        <div className="relative">
          <div className="float-animation">
            <Image
              src="/not-found.svg"
              alt="Not Found Illustration"
              width={400}
              height={400}
              className="w-80 h-80 md:w-96 md:h-96 object-contain mx-auto drop-shadow-sm"
              priority
            />
          </div>

          {/* 404 text overlay */}
          <div className="absolute inset-0 flex items-start justify-center -top-10">
            <span className="text-7xl md:text-8xl font-bold text-muted-foreground/20 select-none dark:text-muted-foreground/90">
              404
            </span>
          </div>
        </div>

        {/* Content section */}
        <section className="text-center space-y-6 max-w-lg mx-auto">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground ">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild className="liquid-button px-8 py-3 font-medium">
              <Link href="/">← Go Home</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="px-8 py-3 font-medium hover:bg-muted bg-transparent"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 grid-background dark:grid-background opacity-30 pointer-events-none "></div>

      {/* User status indicator */}
      {token && (
        <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border">
          Authenticated
        </div>
      )}
    </Container>
  );
};

export default NotFoundPage;
