"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { SpotifyTrack } from "@/lib/spotify";

function formatDuration(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TrackCard({ track }: { track: SpotifyTrack }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const cover = track.album.images?.[0]?.url;

  return (
    <div className="glass p-4 hover:bg-white/[0.07] transition group">
      <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-royal-800">
        {cover && (
          <Image
            src={cover}
            alt={track.album.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {track.preview_url && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-royal-950/0 hover:bg-royal-950/40 transition"
            aria-label={playing ? "Pause preview" : "Play preview"}
          >
            <span className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center text-royal-950 text-2xl opacity-0 group-hover:opacity-100 transition shadow-xl">
              {playing ? "⏸" : "▶"}
            </span>
          </button>
        )}
      </div>

      <h3 className="text-gold-100 font-semibold truncate" title={track.name}>
        {track.name}
      </h3>
      <p className="text-royal-200/70 text-xs truncate" title={track.album.name}>
        {track.album.name}
      </p>

      <div className="mt-3 flex items-center justify-between text-xs text-royal-300/70">
        <span>{formatDuration(track.duration_ms)}</span>
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-300 hover:text-gold-200 font-medium"
        >
          Spotify ↗
        </a>
      </div>

      {track.preview_url && (
        <audio
          ref={audioRef}
          src={track.preview_url}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          preload="none"
        />
      )}
    </div>
  );
}
