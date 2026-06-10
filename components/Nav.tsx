"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/videos", label: "Videos" },
  { href: "/tour", label: "Tour" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-royal-950/85 backdrop-blur-lg border-b border-gold-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-prose flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl md:text-3xl gold-text tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
            LEOKOKO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  active
                    ? "text-gold-300 bg-gold-500/10"
                    : "text-royal-100 hover:text-gold-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-gold-300 p-2"
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6 L18 18 M6 18 L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7 H20" strokeLinecap="round" />
                <path d="M4 12 H20" strokeLinecap="round" />
                <path d="M4 17 H20" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-royal-950/95 backdrop-blur-lg border-t border-gold-500/20 animate-fade-in">
          <div className="container-prose py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-gold-300 bg-gold-500/10"
                    : "text-royal-100 hover:text-gold-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
