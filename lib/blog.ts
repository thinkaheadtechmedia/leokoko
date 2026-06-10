import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author?: string;
  cover?: string;
  scripture?: string;
  tags?: string[];
  readingTime: number; // minutes
  lang: "en" | "sw";
};

export type Post = PostMeta & {
  content: string; // raw markdown
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

function estimateReadingTime(markdown: string) {
  const words = markdown.replace(/[#*_>\-`[\]()]/g, " ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await readDirSafe(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
        const { data, content } = matter(raw);
        const slug = file.replace(/\.(md|mdx)$/, "");
        return {
          slug,
          title: (data.title as string) ?? slug,
          excerpt: (data.excerpt as string) ?? content.slice(0, 160) + "…",
          date: (data.date as string) ?? new Date().toISOString(),
          author: (data.author as string) ?? "LEOKOKO",
          cover: data.cover as string | undefined,
          scripture: data.scripture as string | undefined,
          tags: (data.tags as string[]) ?? [],
          readingTime: estimateReadingTime(content),
          lang: ((data.lang as string) ?? "en") as "en" | "sw",
        } satisfies PostMeta;
      })
  );
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const files = await readDirSafe(POSTS_DIR);
  const match = files.find(
    (f) => f === `${slug}.md` || f === `${slug}.mdx`
  );
  if (!match) return null;
  const raw = await fs.readFile(path.join(POSTS_DIR, match), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    excerpt: (data.excerpt as string) ?? content.slice(0, 160) + "…",
    date: (data.date as string) ?? new Date().toISOString(),
    author: (data.author as string) ?? "LEOKOKO",
    cover: data.cover as string | undefined,
    scripture: data.scripture as string | undefined,
    tags: (data.tags as string[]) ?? [],
    readingTime: estimateReadingTime(content),
    lang: ((data.lang as string) ?? "en") as "en" | "sw",
    content,
  };
}
