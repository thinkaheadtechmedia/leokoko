"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function MerchHeader() {
  const { t } = useLocale();
  return (
    <header className="mb-12">
      <h1 className="section-title">{t.merch.title}</h1>
      <p className="section-sub">{t.merch.sub}</p>
    </header>
  );
}
