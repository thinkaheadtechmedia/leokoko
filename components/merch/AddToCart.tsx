"use client";

import { useMemo, useState } from "react";
import { type Product } from "@/lib/merch";
import { useCart } from "@/lib/store/cart";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function AddToCart({ product }: { product: Product }) {
  const firstInStock = useMemo(
    () => product.variants.find((v) => v.inStock) ?? product.variants[0],
    [product.variants]
  );
  const [variantId, setVariantId] = useState(firstInStock.id);
  const add = useCart((s) => s.add);
  const { t } = useLocale();

  const variant = product.variants.find((v) => v.id === variantId)!;
  const soldOut = !variant.inStock;

  return (
    <div className="space-y-5">
      {product.variants.length > 1 && (
        <div>
          <div className="text-xs uppercase tracking-widest text-royal-300 mb-2">
            Size
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                disabled={!v.inStock}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
                  variantId === v.id
                    ? "bg-gold-gradient text-royal-950 border-transparent"
                    : v.inStock
                    ? "border-gold-500/30 text-royal-100 hover:border-gold-300"
                    : "border-white/10 text-royal-500 line-through cursor-not-allowed"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        disabled={soldOut}
        onClick={() =>
          add({
            id: variant.id,
            productId: product.id,
            name: product.name,
            variant: variant.label,
            price: product.price,
            currency: product.currency,
            image: product.images[0],
          })
        }
        className={`btn-gold w-full justify-center text-base ${
          soldOut ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
        }`}
      >
        {soldOut ? t.merch.soldOut : t.merch.add}
      </button>
    </div>
  );
}
