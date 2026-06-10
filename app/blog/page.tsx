import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import BlogHeader from "@/components/BlogHeader";

export const revalidate = 3600;

export const metadata = {
  title: "Devotionals — LEOKOKO",
  description:
    "Short reflections on Scripture, faith, and the journey behind the music.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className="container-prose py-16">
      <BlogHeader />

      {posts.length === 0 ? (
        <div className="glass p-10 text-center text-royal-200">
          <p>No devotionals yet — first one drops soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group glass overflow-hidden hover:border-gold-400/40 transition"
            >
              {p.cover && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-royal-300 mb-3">
                  <span>
                    {new Date(p.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-gold-500/60">•</span>
                  <span>
                    {p.readingTime} min read
                  </span>
                  {p.lang === "sw" && (
                    <span className="ml-auto rounded-full bg-gold-500/15 text-gold-300 px-2 py-0.5 text-[10px] tracking-widest">
                      SW
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl text-gold-100 group-hover:text-gold-300 transition mb-2">
                  {p.title}
                </h2>
                {p.scripture && (
                  <p className="text-sm italic text-gold-300/80 mb-3">
                    {p.scripture}
                  </p>
                )}
                <p className="text-royal-200/80 text-sm leading-relaxed">
                  {p.excerpt}
                </p>
                <span className="mt-4 inline-block text-gold-300 text-sm font-semibold">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
