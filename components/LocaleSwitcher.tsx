"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SUPPORTED_LOCALES } from "@/lib/i18n/dictionaries";

export default function LocaleSwitcher({
  variant = "nav",
}: {
  variant?: "nav" | "footer";
}) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full p-1 border ${
        variant === "nav"
          ? "border-gold-500/20 bg-royal-900/40"
          : "border-white/10 bg-white/[0.03]"
      }`}
      role="group"
      aria-label="Language"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest transition ${
            locale === l
              ? "bg-gold-gradient text-royal-950"
              : "text-royal-200 hover:text-gold-300"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
