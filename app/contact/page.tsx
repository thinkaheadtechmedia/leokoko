export const metadata = { title: "Contact & Bookings — LEOKOKO" };

export default function ContactPage() {
  return (
    <div className="container-prose py-12">
      <header className="mb-12">
        <h1 className="section-title">Contact &amp; Bookings</h1>
        <div className="h-1 w-20 bg-gold-gradient rounded-full mb-4" />
        <p className="section-sub">
          For event bookings, ministry collaborations, interviews, or general
          inquiries — get in touch below.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8">
          <h2 className="text-2xl font-display text-gold-200 mb-4">
            Direct Contact
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-gold-300 uppercase tracking-widest text-xs mb-1">
                Bookings
              </dt>
              <dd className="text-royal-100">
                <a
                  href="mailto:bookings@leokoko.com"
                  className="hover:text-gold-300"
                >
                  bookings@leokoko.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gold-300 uppercase tracking-widest text-xs mb-1">
                Management
              </dt>
              <dd className="text-royal-100">
                <a
                  href="mailto:management@leokoko.com"
                  className="hover:text-gold-300"
                >
                  management@leokoko.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gold-300 uppercase tracking-widest text-xs mb-1">
                Press &amp; Media
              </dt>
              <dd className="text-royal-100">
                <a
                  href="mailto:press@leokoko.com"
                  className="hover:text-gold-300"
                >
                  press@leokoko.com
                </a>
              </dd>
            </div>
          </dl>
          <p className="text-royal-300/60 text-xs mt-6">
            (Update these emails in <code>app/contact/page.tsx</code>.)
          </p>
        </div>

        <form className="glass p-8 space-y-4">
          <h2 className="text-2xl font-display text-gold-200 mb-2">
            Send a Message
          </h2>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none"
            required
          />
          <select
            className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 focus:border-gold-400/60 focus:outline-none"
            defaultValue=""
            required
          >
            <option value="" disabled>Type of inquiry…</option>
            <option>Booking</option>
            <option>Collaboration</option>
            <option>Interview / Press</option>
            <option>General</option>
          </select>
          <textarea
            placeholder="Your message"
            rows={5}
            className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none resize-none"
            required
          />
          <button type="button" className="btn-gold w-full justify-center">
            Send Message
          </button>
          <p className="text-royal-300/60 text-xs text-center">
            Note: form submission backend coming soon. For now please use the
            email links.
          </p>
        </form>
      </div>
    </div>
  );
}
