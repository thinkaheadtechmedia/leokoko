import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, formatPrice } from "@/lib/merch";
import AddToCart from "@/components/merch/AddToCart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return { title: "Not found — LEOKOKO" };
  return {
    title: `${p.name} — LEOKOKO Merch`,
    description: p.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="container-prose py-16">
      <Link href="/merch" className="text-sm text-gold-300 hover:text-gold-200 inline-block mb-8">
        ← All merch
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-gold-500/20">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full bg-gold-gradient text-royal-950 text-xs font-bold tracking-widest px-3 py-1">
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h1 className="font-display text-4xl md:text-5xl gold-text mb-2">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="text-royal-200/80 mb-4">{product.tagline}</p>
          )}
          <div className="text-2xl text-gold-200 font-semibold mb-6">
            {formatPrice(product.price, product.currency)}
          </div>
          <p className="text-royal-100 leading-relaxed mb-8">
            {product.description}
          </p>

          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
