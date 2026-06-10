import { products } from "@/lib/merch";
import ProductCard from "@/components/merch/ProductCard";
import MerchHeader from "@/components/merch/MerchHeader";

export const metadata = {
  title: "Merch — LEOKOKO",
  description:
    "Premium apparel and vinyl. A portion of every sale supports gospel outreach.",
};

export default function MerchPage() {
  return (
    <div className="container-prose py-16">
      <MerchHeader />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
