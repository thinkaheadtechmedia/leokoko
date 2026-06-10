// Centralized translations for LEOKOKO. Add new keys here and
// `getDictionary(lang).<key>` everywhere in the app.

export const SUPPORTED_LOCALES = ["en", "sw"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  sw: "Kiswahili",
};

const en = {
  brand: "LEOKOKO",
  tagline: "Lifting voices. Healing hearts. Glorifying God.",
  nav: {
    home: "Home",
    music: "Music",
    videos: "Videos",
    tour: "Tour",
    blog: "Devotionals",
    merch: "Merch",
    community: "Community",
    contact: "Contact",
  },
  hero: {
    listen: "Listen now",
    watch: "Watch videos",
  },
  newsletter: {
    title: "Join the family",
    sub: "Get new releases, tour announcements & weekly devotionals — straight to your inbox.",
    placeholder: "your@email.com",
    cta: "Subscribe",
    success: "Welcome to the family! Check your inbox 💛",
    error: "Couldn't subscribe. Please try again.",
    consent:
      "By subscribing you agree to receive emails from LEOKOKO. Unsubscribe anytime.",
  },
  merch: {
    title: "Merch",
    sub: "Wear the message. A portion of every sale supports gospel outreach.",
    add: "Add to cart",
    soldOut: "Sold out",
    cart: "Cart",
    empty: "Your cart is empty.",
    checkout: "Checkout",
    qty: "Qty",
    remove: "Remove",
    total: "Total",
  },
  blog: {
    title: "Devotionals",
    sub: "Short reflections on Scripture, faith, and the journey behind the music.",
    readMore: "Read more",
    backToBlog: "← All devotionals",
    minRead: "min read",
  },
  player: {
    play: "Play",
    pause: "Pause",
    latest: "Latest single",
  },
} as const;

const sw: typeof en = {
  brand: "LEOKOKO",
  tagline: "Tunainua sauti. Tunaponya mioyo. Tunamtukuza Mungu.",
  nav: {
    home: "Nyumbani",
    music: "Muziki",
    videos: "Video",
    tour: "Ziara",
    blog: "Mafundisho",
    merch: "Bidhaa",
    community: "Jumuiya",
    contact: "Wasiliana",
  },
  hero: {
    listen: "Sikiliza sasa",
    watch: "Tazama video",
  },
  newsletter: {
    title: "Jiunge na familia",
    sub: "Pata habari za nyimbo mpya, ziara na mafundisho ya kila wiki — moja kwa moja kwenye barua pepe yako.",
    placeholder: "wewe@email.com",
    cta: "Jisajili",
    success: "Karibu kwenye familia! Angalia barua pepe yako 💛",
    error: "Imeshindikana. Tafadhali jaribu tena.",
    consent:
      "Kwa kujisajili unakubali kupokea barua pepe kutoka LEOKOKO. Unaweza kujiondoa wakati wowote.",
  },
  merch: {
    title: "Bidhaa",
    sub: "Vaa ujumbe. Sehemu ya kila mauzo inasaidia huduma za injili.",
    add: "Ongeza kwenye kikapu",
    soldOut: "Imeisha",
    cart: "Kikapu",
    empty: "Kikapu chako hakina kitu.",
    checkout: "Lipa",
    qty: "Idadi",
    remove: "Ondoa",
    total: "Jumla",
  },
  blog: {
    title: "Mafundisho",
    sub: "Tafakari fupi za Maandiko, imani na safari nyuma ya muziki.",
    readMore: "Soma zaidi",
    backToBlog: "← Mafundisho yote",
    minRead: "dakika za kusoma",
  },
  player: {
    play: "Cheza",
    pause: "Simama",
    latest: "Wimbo wa hivi karibuni",
  },
};

const dictionaries: Record<Locale, typeof en> = { en, sw };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export type Dictionary = typeof en;
