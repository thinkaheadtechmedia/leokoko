"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function BlogHeader() {
  const { t } = useLocale();
  return (
    <header className="mb-12">
      <h1 className="section-title">{t.blog.title}</h1>
      <p className="section-sub">{t.blog.sub}</p>
    </header>
  );
}
