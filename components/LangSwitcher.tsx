"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function LangSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full border border-gold-500/30 overflow-hidden text-xs font-semibold"
    >
      {(["en", "sw"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`px-3 py-1.5 transition ${
            locale === l
              ? "bg-gold-gradient text-royal-950"
              : "text-gold-200 hover:bg-gold-500/10"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
