import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image (optional — drop /public/images/hero.jpg to enable) */}
      <div className="absolute inset-0 -z-10">
        <SafeImage
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        {/* Royal gradient overlay so text stays readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-950/70 via-royal-950/60 to-royal-950" />
      </div>

      {/* Decorative glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-royal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-prose relative py-24 md:py-36 text-center">
        <p className="text-gold-300/80 tracking-[0.4em] text-xs md:text-sm mb-6 animate-fade-in">
          OFFICIAL GOSPEL ARTIST
        </p>
        <h1 className="font-display text-6xl md:text-9xl gold-text tracking-[0.15em] leading-none animate-fade-up">
          LEOKOKO
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-royal-100 italic font-light animate-fade-up [animation-delay:200ms] opacity-0">
          &ldquo;Lifting voices. Healing hearts. Glorifying God.&rdquo;
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
          <Link href="/music" className="btn-gold">
            🎵 Listen Now
          </Link>
          <Link href="/community" className="btn-outline">
            💬 Join the Community
          </Link>
        </div>

        {/* Streaming badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-royal-200/70 animate-fade-in [animation-delay:600ms] opacity-0">
          <span className="tracking-widest text-xs uppercase">Stream on</span>
          <a
            href="https://open.spotify.com/artist/6yLIpvQqRMGVe8eYUBI8Hw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-300 transition"
          >
            Spotify
          </a>
          <span className="text-gold-500/40">•</span>
          <a
            href="https://www.youtube.com/@officialleokoko"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-300 transition"
          >
            YouTube
          </a>
          <span className="text-gold-500/40">•</span>
          <span className="text-royal-300/50">Apple Music (soon)</span>
          <span className="text-gold-500/40">•</span>
          <span className="text-royal-300/50">Boomplay (soon)</span>
        </div>
      </div>
    </section>
  );
}
