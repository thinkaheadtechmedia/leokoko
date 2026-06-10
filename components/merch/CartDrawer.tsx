"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store/cart";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatPrice } from "@/lib/merch";

export default function CartDrawer() {
  const { items, open, setOpen, remove, setQty, subtotal, clear } = useCart();
  const { t } = useLocale();
  const [busy, setBusy] = useState(false);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const checkout = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error === "stripe_not_configured") {
        alert(
          "Checkout isn't configured yet. Add STRIPE_SECRET_KEY to enable payments."
        );
        setBusy(false);
      } else {
        alert("Checkout failed. Please try again.");
        setBusy(false);
      }
    } catch {
      alert("Checkout failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-royal-950/60 backdrop-blur-sm z-[60] transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-royal-950/95 backdrop-blur-xl border-l border-gold-500/20 z-[61] flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-5 border-b border-gold-500/20">
          <h2 className="font-display text-xl gold-text">{t.merch.cart}</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-royal-300 hover:text-gold-300 p-1"
            aria-label="Close cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6 L18 18 M6 18 L18 6" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-royal-300 px-6 text-center">
            <div>
              <div className="text-5xl mb-3">🛍️</div>
              <p>{t.merch.empty}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 glass p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gold-500/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gold-100 truncate">
                      {item.name}
                    </div>
                    {item.variant && (
                      <div className="text-xs text-royal-300">
                        {item.variant}
                      </div>
                    )}
                    <div className="text-sm text-gold-200 mt-1">
                      {formatPrice(item.price, item.currency)}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        className="h-7 w-7 grid place-items-center rounded-full border border-gold-500/30 text-gold-200 hover:bg-gold-500/10"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        className="h-7 w-7 grid place-items-center rounded-full border border-gold-500/30 text-gold-200 hover:bg-gold-500/10"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="ml-auto text-xs text-royal-300 hover:text-gold-300"
                      >
                        {t.merch.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gold-500/20 p-5 space-y-4 bg-royal-950/60">
              <div className="flex items-center justify-between text-royal-100">
                <span>{t.merch.total}</span>
                <span className="font-display text-xl gold-text">
                  {formatPrice(subtotal(), items[0]?.currency ?? "USD")}
                </span>
              </div>
              <button
                disabled={busy}
                onClick={checkout}
                className="btn-gold w-full justify-center"
              >
                {busy ? "…" : t.merch.checkout}
              </button>
              <button
                onClick={clear}
                className="block mx-auto text-xs text-royal-300 hover:text-gold-300"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
