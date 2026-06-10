"use client";

import { create } from "zustand";

export type PlayerTrack = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  /** 30s Spotify preview, or hosted snippet */
  previewUrl: string;
  /** Full track Spotify URL (used for "open in Spotify" button) */
  externalUrl?: string;
};

type PlayerState = {
  current: PlayerTrack | null;
  playing: boolean;
  visible: boolean;
  play: (track: PlayerTrack) => void;
  toggle: () => void;
  stop: () => void;
  setPlaying: (playing: boolean) => void;
};

export const usePlayer = create<PlayerState>((set, get) => ({
  current: null,
  playing: false,
  visible: false,
  play: (track) => {
    const same = get().current?.id === track.id;
    set({
      current: track,
      playing: true,
      visible: true,
    });
    return same;
  },
  toggle: () => set((s) => ({ playing: !s.playing })),
  stop: () => set({ playing: false }),
  setPlaying: (playing) => set({ playing }),
}));
