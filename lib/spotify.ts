/**
 * Spotify Web API client (Client Credentials flow).
 * Server-side only — never expose secrets to the browser.
 */

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

type TokenCache = { accessToken: string; expiresAt: number } | null;
let tokenCache: TokenCache = null;

async function getAccessToken(): Promise<string> {
  // Reuse cached token if still valid (with 60s safety buffer).
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local"
    );
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spotify token request failed: ${res.status}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

async function spotifyFetch<T>(path: string): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${SPOTIFY_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    // Cache at the Next.js layer for 1 hour
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Spotify API ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

// ---- Public types ----

export type SpotifyArtist = {
  id: string;
  name: string;
  followers: { total: number };
  genres: string[];
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  preview_url: string | null;
  duration_ms: number;
  external_urls: { spotify: string };
  album: {
    id: string;
    name: string;
    release_date: string;
    images: { url: string; width: number; height: number }[];
  };
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  album_type: "album" | "single" | "compilation";
  release_date: string;
  total_tracks: number;
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
};

// ---- Public API ----

export async function getArtist(artistId: string): Promise<SpotifyArtist> {
  return spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);
}

export async function getTopTracks(
  artistId: string,
  market = "US"
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<{ tracks: SpotifyTrack[] }>(
    `/artists/${artistId}/top-tracks?market=${market}`
  );
  return data.tracks;
}

export async function getAlbums(
  artistId: string,
  limit = 20
): Promise<SpotifyAlbum[]> {
  const data = await spotifyFetch<{ items: SpotifyAlbum[] }>(
    `/artists/${artistId}/albums?include_groups=album,single&limit=${limit}&market=US`
  );
  return data.items;
}
