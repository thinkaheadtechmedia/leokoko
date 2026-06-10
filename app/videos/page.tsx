import { getChannelVideos } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";

export const revalidate = 3600;

const HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || "@officialleokoko";

export default async function VideosPage() {
  let videos: Awaited<ReturnType<typeof getChannelVideos>> = [];
  let error: string | null = null;

  try {
    videos = await getChannelVideos(HANDLE, 18);
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Unable to load YouTube videos right now.";
  }

  return (
    <div className="container-prose py-12">
      <header className="mb-12">
        <h1 className="section-title">Videos</h1>
        <div className="h-1 w-20 bg-gold-gradient rounded-full mb-4" />
        <p className="section-sub">
          Music videos, behind-the-scenes, live worship — straight from the
          official YouTube channel.
        </p>
      </header>

      {error && (
        <div className="glass p-8 mb-12 border-gold-400/30">
          <h2 className="text-gold-300 text-xl mb-2">
            📺 YouTube feed not yet connected
          </h2>
          <p className="text-royal-100/80 text-sm leading-relaxed">
            Add <code className="text-gold-200">YOUTUBE_API_KEY</code> to your{" "}
            <code className="text-gold-200">.env.local</code> file. See the
            README for instructions.
          </p>
          <p className="text-royal-300/60 text-xs mt-3">Details: {error}</p>
          <a
            href="https://www.youtube.com/@officialleokoko"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-6 inline-flex"
          >
            Visit the YouTube channel ↗
          </a>
        </div>
      )}

      {videos.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
