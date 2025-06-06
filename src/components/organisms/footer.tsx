"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useIsInViewport } from "@/hooks/use-is-in-viewport";

export default function AnimatedWaveFooter() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsInViewport(contentRef, 0.1);

  return (
    <footer className="relative  bg-zinc-900/50 dark:bg-slate-900/50 pt-20">
      {/* Wave animation */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="relative flex w-[3600px] animate-wave">
          {[...Array(2)].map((_, i) => (
            <svg
              key={i}
              className="h-[500px] w-[1800px] shrink-0"
              viewBox="0 0 1800 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
                fill="currentColor"
                className="text-primary/5"
              />
              <path
                d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
                fill="currentColor"
                className="text-primary/10"
              />
            </svg>
          ))}
        </div>
      </div> */}

      {/* Footer content */}
      <div
        ref={contentRef}
        className={`container relative z-10 mx-auto px-4 md:px-6 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Stay Connected */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Stay Connected</h2>
            <form className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="backdrop-blur-sm"
                />
              </div>
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {["Home", "About Us", "Services", "Products", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="block transition-colors hover:text-primary"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{Icon.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
