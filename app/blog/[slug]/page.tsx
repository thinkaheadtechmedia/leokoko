import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { Markdown } from "@/lib/markdown";
import Newsletter from "@/components/Newsletter";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found — LEOKOKO" };
  return {
    title: `${post.title} — LEOKOKO`,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="container-prose py-16 max-w-3xl">
      <Link
        href="/blog"
        className="text-sm text-gold-300 hover:text-gold-200 inline-block mb-8"
      >
        ← All devotionals
      </Link>

      {post.cover && (
        <div className="relative h-72 w-full mb-10 rounded-2xl overflow-hidden border border-gold-500/20">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 720px, 100vw"
            priority
          />
        </div>
      )}

      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-royal-300 mb-4">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-gold-500/60">•</span>
          <span>{post.readingTime} min read</span>
          <span className="text-gold-500/60">•</span>
          <span>{post.author}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl gold-text leading-tight mb-4">
          {post.title}
        </h1>
        {post.scripture && (
          <p className="italic text-gold-300/90 text-lg">
            {post.scripture}
          </p>
        )}
      </header>

      <Markdown source={post.content} />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gold-500/30 px-3 py-1 text-xs text-gold-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-16">
        <Newsletter compact />
      </div>
    </article>
  );
}
