/**
 * Merch catalog. In production swap this for Shopify Storefront API or a CMS.
 * Prices are in cents (USD).
 */

export type ProductVariant = {
  id: string;
  label: string; // "S", "M", "L / Black"
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // cents
  currency: "USD";
  images: string[]; // hosted URLs OR /public paths
  variants: ProductVariant[];
  tagline?: string;
  badge?: string; // e.g. "New", "Limited"
};

export const products: Product[] = [
  {
    id: "tee-voices",
    slug: "lifting-voices-tee",
    name: "‘Lifting Voices’ Tee",
    tagline: "Premium heavyweight cotton. Gold foil print.",
    description:
      "Our signature tee, embroidered with the tour mantra in champagne gold. 100% combed organic cotton, ethically sourced. A portion of every sale supports gospel outreach in East Africa.",
    price: 3500,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: [
      { id: "tee-voices-s", label: "Small", inStock: true },
      { id: "tee-voices-m", label: "Medium", inStock: true },
      { id: "tee-voices-l", label: "Large", inStock: true },
      { id: "tee-voices-xl", label: "X-Large", inStock: true },
      { id: "tee-voices-xxl", label: "XX-Large", inStock: false },
    ],
    badge: "New",
  },
  {
    id: "hoodie-royal",
    slug: "royal-hoodie",
    name: "Royal Navy Hoodie",
    tagline: "Heavyweight fleece. Gold-stitched crest.",
    description:
      "A deep royal navy hoodie with a hand-stitched gold crest. Cozy enough for the studio, sharp enough for the green room.",
    price: 6500,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: [
      { id: "hoodie-royal-s", label: "Small", inStock: true },
      { id: "hoodie-royal-m", label: "Medium", inStock: true },
      { id: "hoodie-royal-l", label: "Large", inStock: true },
      { id: "hoodie-royal-xl", label: "X-Large", inStock: true },
    ],
  },
  {
    id: "vinyl-debut",
    slug: "debut-vinyl",
    name: "Debut Album — Vinyl",
    tagline: "180g pressing. Gatefold sleeve.",
    description:
      "The debut record, on warm 180g vinyl. Includes liner notes, lyrics, and a hand-signed insert from Leo himself.",
    price: 4200,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: [{ id: "vinyl-debut-std", label: "Standard", inStock: true }],
    badge: "Limited",
  },
  {
    id: "cap-crest",
    slug: "crest-cap",
    name: "Crest Cap",
    tagline: "Six-panel. Embroidered crest.",
    description:
      "Low-profile six-panel cap in midnight navy, with the LEOKOKO crest in champagne gold thread.",
    price: 2800,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop",
    ],
    variants: [{ id: "cap-crest-os", label: "One size", inStock: true }],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
