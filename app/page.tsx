import Link from "next/link";
import Hero from "@/components/Hero";
import SafeImage from "@/components/SafeImage";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About / Bio */}
      <section className="container-prose py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Portrait — drop /public/images/portrait.jpg to enable */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl shadow-royal-950/50 bg-royal-900/40">
            <SafeImage
              src="/images/portrait.jpg"
              alt="LEOKOKO portrait"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            {/* Subtle gold inner frame */}
            <div className="absolute inset-0 ring-1 ring-inset ring-gold-400/20 rounded-2xl pointer-events-none" />
          </div>

          <div>
            <h2 className="section-title">About LEOKOKO</h2>
            <div className="h-1 w-20 bg-gold-gradient rounded-full mb-6" />
            <p className="text-royal-100/90 leading-relaxed mb-4">
              LEOKOKO is a gospel artist on a mission to spread the message of
              hope, faith, and salvation through music. Each song is a prayer
              set to melody — crafted to lift the weary, comfort the broken,
              and turn every listener&apos;s heart toward the One who saves.
            </p>
            <p className="text-royal-100/90 leading-relaxed mb-6">
              From soul-stirring worship to powerful praise anthems, LEOKOKO&apos;s
              ministry through music is reaching listeners across the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/music" className="btn-outline">
                Explore the Music →
              </Link>
              <Link href="/contact" className="btn-outline">
                Bookings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links grid */}
      <section className="container-prose py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/music",     icon: "🎵", title: "Music",     desc: "Latest songs & albums" },
            { href: "/videos",    icon: "📺", title: "Videos",    desc: "Watch the latest visuals" },
            { href: "/tour",      icon: "📅", title: "Tour",      desc: "Upcoming events" },
            { href: "/community", icon: "💬", title: "Community", desc: "Chat with fans" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass p-6 hover:bg-white/[0.08] hover:border-gold-400/40 transition group"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-gold-200 font-semibold text-lg mb-1 group-hover:text-gold-300">
                {item.title}
              </h3>
              <p className="text-royal-200/70 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery strip — drop /public/images/gallery-1.jpg … gallery-4.jpg */}
      <section className="container-prose py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="section-title">In the Moment</h2>
          <p className="text-royal-300/60 text-sm hidden sm:block">
            Studio · Stage · Worship
          </p>
        </div>
        <div className="h-1 w-20 bg-gold-gradient rounded-full mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden border border-gold-500/15 bg-royal-900/40 group"
            >
              <SafeImage
                src={`/images/gallery-${i}.jpg`}
                alt={`LEOKOKO gallery image ${i}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-950/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Verse banner with optional background */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SafeImage
            src="/images/verse-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-950 via-royal-950/80 to-royal-950" />
        </div>
        <div className="container-prose">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-display text-2xl md:text-3xl text-gold-200 italic leading-relaxed">
              &ldquo;Sing to the Lord a new song; sing to the Lord, all the
              earth.&rdquo;
            </p>
            <p className="mt-4 text-royal-300 text-sm tracking-widest">
              PSALM 96:1
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
