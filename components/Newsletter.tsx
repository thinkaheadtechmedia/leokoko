"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Newsletter({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setMessage(t.newsletter.ok);
        setEmail("");
      } else {
        setStatus("err");
        setMessage(data.message ?? t.newsletter.err);
      }
    } catch {
      setStatus("err");
      setMessage(t.newsletter.err);
    }
  };

  return (
    <section
      className={`glass shimmer-border ${compact ? "p-6 md:p-8" : "p-8 md:p-12"}`}
    >
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[10px] tracking-[0.4em] text-gold-300 mb-3">
          ✦ {t.newsletter.eyebrow} ✦
        </div>
        <h2 className={`font-display gold-text ${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"}`}>
          {t.newsletter.title}
        </h2>
        <p className="text-royal-200/80 mt-3 mb-6">{t.newsletter.sub}</p>

        <form
          onSubmit={submit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.placeholder}
            className="flex-1 rounded-full bg-white/5 border border-gold-500/30 px-5 py-3 text-royal-50 placeholder:text-royal-400 focus:outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-400/30 transition"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-gold justify-center"
          >
            {status === "loading" ? "…" : t.newsletter.button}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className={`mt-4 text-sm ${
              status === "ok" ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-[11px] text-royal-400 mt-4">
          {t.newsletter.privacy}
        </p>
      </div>
    </section>
  );
}
