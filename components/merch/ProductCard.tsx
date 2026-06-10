"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product, formatPrice } from "@/lib/merch";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/merch/${product.slug}`}
      className="group glass overflow-hidden hover:border-gold-400/40 transition flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-gold-gradient text-royal-950 text-[10px] font-bold tracking-widest px-2.5 py-1">
            {product.badge.toUpperCase()}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-lg text-gold-100 group-hover:text-gold-300 transition">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-xs text-royal-300 mt-1 line-clamp-2">
            {product.tagline}
          </p>
        )}
        <div className="mt-3 font-semibold text-gold-200">
          {formatPrice(product.price, product.currency)}
        </div>
      </div>
    </Link>
  );
}
