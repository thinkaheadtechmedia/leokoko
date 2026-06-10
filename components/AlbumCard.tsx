import Image from "next/image";
import type { SpotifyAlbum } from "@/lib/spotify";

export default function AlbumCard({ album }: { album: SpotifyAlbum }) {
  const cover = album.images?.[0]?.url;
  return (
    <a
      href={album.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="glass p-4 block hover:bg-white/[0.07] transition group"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-royal-800 mb-3">
        {cover && (
          <Image
            src={cover}
            alt={album.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <span className="absolute top-2 right-2 text-[10px] uppercase tracking-widest bg-royal-950/70 text-gold-300 px-2 py-1 rounded-full">
          {album.album_type}
        </span>
      </div>
      <h3 className="text-gold-100 font-semibold truncate" title={album.name}>
        {album.name}
      </h3>
      <p className="text-royal-300/70 text-xs">
        {album.release_date?.slice(0, 4)} · {album.total_tracks} tracks
      </p>
    </a>
  );
}
