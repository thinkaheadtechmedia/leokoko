import Link from "next/link";
import SafeImage from "@/components/SafeImage";

const socials = [
  { label: "Spotify", href: "https://open.spotify.com/artist/6yLIpvQqRMGVe8eYUBI8Hw" },
  { label: "YouTube", href: "https://www.youtube.com/@officialleokoko" },
  { label: "Apple Music", href: "#" }, // placeholder
  { label: "Boomplay", href: "#" },    // placeholder
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold-500/20 bg-royal-950/60">
      <div className="container-prose py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            {/* Optional brand mark — drop /public/images/logo-mark.png to enable */}
            <div className="relative w-10 h-10 shrink-0">
              <SafeImage
                src="/images/logo-mark.png"
                alt="LEOKOKO mark"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <h3 className="font-display text-2xl gold-text tracking-[0.2em]">
              LEOKOKO
            </h3>
          </div>
          <p className="mt-3 text-royal-200/80 text-sm leading-relaxed">
            Lifting voices. Healing hearts. Glorifying God.
          </p>
        </div>

        <div>
          <h4 className="text-gold-300 font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-royal-100">
            <li><Link href="/music" className="hover:text-gold-300">Music</Link></li>
            <li><Link href="/videos" className="hover:text-gold-300">Videos</Link></li>
            <li><Link href="/tour" className="hover:text-gold-300">Tour</Link></li>
            <li><Link href="/community" className="hover:text-gold-300">Community</Link></li>
            <li><Link href="/contact" className="hover:text-gold-300">Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold-300 font-semibold mb-3">Listen Everywhere</h4>
          <ul className="space-y-2 text-sm text-royal-100">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-royal-300/60">
        © {new Date().getFullYear()} LEOKOKO. All rights reserved.
        <span className="mx-2">·</span>
        To God be the glory. 🙏
      </div>
    </footer>
  );
}
