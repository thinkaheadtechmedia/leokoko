import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint.
 *
 * Integrations supported via env vars (any one of):
 *   - MAILCHIMP_API_KEY + MAILCHIMP_AUDIENCE_ID + MAILCHIMP_SERVER (e.g. "us21")
 *   - BUTTONDOWN_API_KEY
 *
 * If none are configured, the endpoint accepts the email and logs it
 * (useful for local development).
 */
export async function POST(req: Request) {
  let email: string | undefined;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  try {
    // Mailchimp
    if (
      process.env.MAILCHIMP_API_KEY &&
      process.env.MAILCHIMP_AUDIENCE_ID &&
      process.env.MAILCHIMP_SERVER
    ) {
      const res = await fetch(
        `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `anystring:${process.env.MAILCHIMP_API_KEY}`
            ).toString("base64")}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
          }),
        }
      );
      if (!res.ok && res.status !== 400) {
        throw new Error(`Mailchimp ${res.status}`);
      }
      return NextResponse.json({ ok: true });
    }

    // Buttondown
    if (process.env.BUTTONDOWN_API_KEY) {
      const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email }),
      });
      if (!res.ok && res.status !== 400) {
        throw new Error(`Buttondown ${res.status}`);
      }
      return NextResponse.json({ ok: true });
    }

    // Dev fallback
    console.log("[newsletter] (dev) subscribe:", email);
    return NextResponse.json({ ok: true, dev: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json(
      { message: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
