"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePlayer } from "@/lib/store/player";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Persistent mini-player rendered in root layout.
 * Hidden until a track is played; uses Spotify 30s previews.
 */
export default function MiniPlayer() {
  const { current, playing, visible, toggle, setPlaying, stop } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { t } = useLocale();

  // Sync audio element with store state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;

    if (audio.src !== current.previewUrl) {
      audio.src = current.previewUrl;
      audio.load();
    }

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [current, playing, setPlaying]);

  if (!visible || !current) return null;

  return (
    <div
      className="fixed bottom-4 inset-x-4 md:left-auto md:right-6 md:bottom-6 md:w-[380px] z-40 animate-fade-in"
      role="region"
      aria-label="Music player"
    >
      <div className="glass shimmer-border rounded-2xl p-3 shadow-2xl shadow-royal-950/60 bg-royal-950/85 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gold-500/30">
            {current.artwork ? (
              <Image
                src={current.artwork}
                alt={current.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gold-gradient" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-royal-50">
              {current.title}
            </div>
            <div className="truncate text-xs text-royal-300">
              {current.artist}
            </div>
            {/* progress bar */}
            <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gold-gradient transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button
            onClick={toggle}
            aria-label={playing ? t.player.pause : t.player.play}
            className="h-11 w-11 rounded-full bg-gold-gradient text-royal-950 grid place-items-center shadow-lg shadow-gold-500/30 hover:scale-105 transition"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={stop}
            aria-label="Close player"
            className="text-royal-300 hover:text-gold-300 p-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6 L18 18 M6 18 L18 6" />
            </svg>
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => {
          // Only sync to store; don't call setPlaying(true) here
        }}
        preload="metadata"
      />
    </div>
  );
}
