import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/store/cart";

/**
 * Creates a Stripe Checkout session from a cart.
 *
 * Requires:
 *   - STRIPE_SECRET_KEY
 *
 * Returns { url } on success, or { error: "stripe_not_configured" }
 * if the key is missing (so the UI can show a friendly notice).
 *
 * We intentionally call the Stripe REST API via fetch to avoid a hard
 * dependency on the `stripe` npm package.
 */
export async function POST(req: Request) {
  let items: CartItem[] = [];
  try {
    const body = await req.json();
    items = body?.items ?? [];
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!items.length) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "stripe_not_configured" },
      { status: 200 }
    );
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const form = new URLSearchParams();
  form.append("mode", "payment");
  form.append("success_url", `${origin}/merch/success?session_id={CHECKOUT_SESSION_ID}`);
  form.append("cancel_url", `${origin}/merch?canceled=1`);
  form.append("shipping_address_collection[allowed_countries][]", "US");
  form.append("shipping_address_collection[allowed_countries][]", "CA");
  form.append("shipping_address_collection[allowed_countries][]", "GB");
  form.append("shipping_address_collection[allowed_countries][]", "KE");
  form.append("shipping_address_collection[allowed_countries][]", "TZ");
  form.append("shipping_address_collection[allowed_countries][]", "UG");

  items.forEach((item, i) => {
    form.append(
      `line_items[${i}][price_data][currency]`,
      item.currency.toLowerCase()
    );
    form.append(
      `line_items[${i}][price_data][product_data][name]`,
      item.variant ? `${item.name} — ${item.variant}` : item.name
    );
    form.append(
      `line_items[${i}][price_data][product_data][images][]`,
      item.image
    );
    form.append(
      `line_items[${i}][price_data][unit_amount]`,
      String(item.price)
    );
    form.append(`line_items[${i}][quantity]`, String(item.qty));
  });

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("[checkout] stripe error:", data);
      return NextResponse.json(
        { error: data?.error?.message ?? "stripe_error" },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
