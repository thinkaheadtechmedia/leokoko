import { getAlbums, getArtist, getTopTracks } from "@/lib/spotify";
import TrackCard from "@/components/TrackCard";
import AlbumCard from "@/components/AlbumCard";

export const revalidate = 3600; // re-fetch from Spotify every hour

const ARTIST_ID =
  process.env.SPOTIFY_ARTIST_ID || "6yLIpvQqRMGVe8eYUBI8Hw";

export default async function MusicPage() {
  let artist = null;
  let topTracks: Awaited<ReturnType<typeof getTopTracks>> = [];
  let albums: Awaited<ReturnType<typeof getAlbums>> = [];
  let error: string | null = null;

  try {
    [artist, topTracks, albums] = await Promise.all([
      getArtist(ARTIST_ID),
      getTopTracks(ARTIST_ID),
      getAlbums(ARTIST_ID),
    ]);
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Unable to load music right now. Please check Spotify API credentials.";
  }

  return (
    <div className="container-prose py-12">
      <header className="mb-12">
        <h1 className="section-title">Music</h1>
        <div className="h-1 w-20 bg-gold-gradient rounded-full mb-4" />
        {artist && (
          <p className="section-sub">
            {artist.followers.total.toLocaleString()} followers on Spotify ·
            Auto-updates every hour as new music drops.
          </p>
        )}
      </header>

      {error && (
        <div className="glass p-8 mb-12 border-gold-400/30">
          <h2 className="text-gold-300 text-xl mb-2">
            🎵 Music feed not yet connected
          </h2>
          <p className="text-royal-100/80 text-sm leading-relaxed">
            Add your Spotify <code className="text-gold-200">CLIENT_ID</code>{" "}
            and <code className="text-gold-200">CLIENT_SECRET</code> to{" "}
            <code className="text-gold-200">.env.local</code> to display live
            tracks here. See the README for step-by-step setup.
          </p>
          <p className="text-royal-300/60 text-xs mt-3">
            Details: {error}
          </p>
        </div>
      )}

      {topTracks.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-display text-gold-200 mb-6">
            Top Tracks
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {topTracks.map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section>
          <h2 className="text-2xl font-display text-gold-200 mb-6">
            Albums &amp; Singles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {albums.map((a) => (
              <AlbumCard key={a.id} album={a} />
            ))}
          </div>
        </section>
      )}

      {/* Other platforms */}
      <section className="mt-20">
        <h2 className="text-2xl font-display text-gold-200 mb-6">
          Listen on Other Platforms
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Spotify", href: "https://open.spotify.com/artist/6yLIpvQqRMGVe8eYUBI8Hw", live: true },
            { name: "YouTube Music", href: "https://www.youtube.com/@officialleokoko", live: true },
            { name: "Apple Music", href: "#", live: false },
            { name: "Boomplay", href: "#", live: false },
          ].map((p) => (
            <a
              key={p.name}
              href={p.href}
              target={p.live ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`glass p-5 text-center transition ${
                p.live
                  ? "hover:bg-white/[0.08] hover:border-gold-400/40"
                  : "opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="text-gold-200 font-semibold">{p.name}</div>
              <div className="text-xs text-royal-300/70 mt-1">
                {p.live ? "Listen now ↗" : "Coming soon"}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
