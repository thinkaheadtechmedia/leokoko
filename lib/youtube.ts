/**
 * YouTube Data API v3 client.
 * Server-side only — keeps the API key off the browser.
 */

const YT_BASE = "https://www.googleapis.com/youtube/v3";

export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

type ChannelCache = { id: string; cachedAt: number } | null;
let channelCache: ChannelCache = null;

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error("Missing YOUTUBE_API_KEY in .env.local");
  }
  return key;
}

/**
 * Resolve a YouTube handle like "@officialleokoko" into a channel ID.
 * Cached for 24h since channel IDs never change.
 */
export async function resolveChannelId(handle: string): Promise<string> {
  if (channelCache && Date.now() - channelCache.cachedAt < 86_400_000) {
    return channelCache.id;
  }

  const key = getApiKey();
  const clean = handle.startsWith("@") ? handle.slice(1) : handle;
  const url = `${YT_BASE}/channels?part=id&forHandle=${encodeURIComponent(
    clean
  )}&key=${key}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) {
    throw new Error(`YouTube channel lookup failed: ${res.status}`);
  }
  const data = (await res.json()) as { items?: { id: string }[] };
  const id = data.items?.[0]?.id;
  if (!id) {
    throw new Error(`Could not resolve YouTube handle: ${handle}`);
  }
  channelCache = { id, cachedAt: Date.now() };
  return id;
}

/**
 * Fetch the most recent videos from a channel.
 */
export async function getChannelVideos(
  handle: string,
  maxResults = 12
): Promise<YouTubeVideo[]> {
  const key = getApiKey();
  const channelId = await resolveChannelId(handle);

  const url =
    `${YT_BASE}/search` +
    `?part=snippet` +
    `&channelId=${channelId}` +
    `&maxResults=${maxResults}` +
    `&order=date` +
    `&type=video` +
    `&key=${key}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`YouTube videos fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as {
    items: {
      id: { videoId: string };
      snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: { high?: { url: string }; medium?: { url: string } };
      };
    }[];
  };

  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail:
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      "",
    publishedAt: item.snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));
}
