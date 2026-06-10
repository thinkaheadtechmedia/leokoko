import Link from "next/link";
import ClearCartOnMount from "@/components/merch/ClearCartOnMount";

export const metadata = { title: "Order received — LEOKOKO" };

export default function SuccessPage() {
  return (
    <div className="container-prose py-24 text-center">
      <ClearCartOnMount />
      <div className="glass shimmer-border max-w-xl mx-auto p-10">
        <div className="text-5xl mb-4">✦</div>
        <h1 className="font-display text-4xl gold-text mb-3">
          Thank you.
        </h1>
        <p className="text-royal-100 leading-relaxed mb-6">
          Your order has been received. A confirmation email is on its way.
          A portion of every sale goes toward gospel outreach — so thank you
          for being part of the story.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/merch" className="btn-gold">
            Keep shopping
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-gold-500/40 text-gold-200 px-6 py-3 hover:bg-gold-500/10 transition"
          >
            Read a devotional
          </Link>
        </div>
      </div>
    </div>
  );
}
