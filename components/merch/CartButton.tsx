"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/store/cart";

export default function CartButton() {
  const { count, setOpen } = useCart();
  // avoid hydration mismatch from persisted store
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const c = mounted ? count() : 0;

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={`Cart (${c} items)`}
      className="relative h-10 w-10 grid place-items-center rounded-full border border-gold-500/30 text-gold-200 hover:bg-gold-500/10 transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 L3 6 V20 a2 2 0 0 0 2 2 h14 a2 2 0 0 0 2 -2 V6 L18 2 Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10 a4 4 0 0 1 -8 0" />
      </svg>
      {c > 0 && (
        <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-gold-gradient text-royal-950 text-[10px] font-bold grid place-items-center px-1">
          {c}
        </span>
      )}
    </button>
  );
}
