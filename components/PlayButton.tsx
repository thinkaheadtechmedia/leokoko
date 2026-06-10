"use client";

import { usePlayer, type PlayerTrack } from "@/lib/store/player";

/**
 * Drop-in button that plays a track in the persistent mini-player.
 * Usage:
 *   <PlayButton track={{ id, title, artist, artwork, previewUrl }} />
 */
export default function PlayButton({
  track,
  className = "",
  size = 44,
}: {
  track: PlayerTrack;
  className?: string;
  size?: number;
}) {
  const { current, playing, play, toggle } = usePlayer();
  const isCurrent = current?.id === track.id;
  const isPlaying = isCurrent && playing;

  const onClick = () => {
    if (isCurrent) toggle();
    else play(track);
  };

  if (!track.previewUrl) {
    return (
      <button
        disabled
        title="No preview available"
        className={`grid place-items-center rounded-full bg-white/10 text-royal-400 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={isPlaying ? "Pause" : "Play"}
      className={`grid place-items-center rounded-full bg-gold-gradient text-royal-950 shadow-lg shadow-gold-500/30 hover:scale-110 transition ${className}`}
      style={{ width: size, height: size }}
    >
      {isPlaying ? (
        <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
