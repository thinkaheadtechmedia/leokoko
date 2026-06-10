"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getDictionary,
  type Dictionary,
  type Locale,
} from "./dictionaries";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "leokoko.locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // hydrate from localStorage / browser preference
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem(STORAGE_KEY) as Locale | null)
        : null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      return;
    }
    const nav =
      typeof navigator !== "undefined"
        ? navigator.language.slice(0, 2).toLowerCase()
        : "";
    if (nav === "sw") {
      setLocaleState("sw");
      document.documentElement.lang = "sw";
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  };

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: getDictionary(locale) }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Safe fallback so server components / tests don't crash.
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: getDictionary(DEFAULT_LOCALE),
    };
  }
  return ctx;
}
