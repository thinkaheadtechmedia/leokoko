# LEOKOKO — Official Website

The official website for gospel artist **LEOKOKO**.
*"Lifting voices. Healing hearts. Glorifying God."*

Built with **Next.js 14 + TypeScript + Tailwind CSS**, with live music feeds from Spotify & YouTube and a real-time fan community chat powered by Supabase.

---

## ✨ Features

- 🎨 Royal purple + gold gospel design
- 🎵 Live Spotify discography (auto-updates as new songs are released)
- 📺 YouTube videos pulled from the official channel
- 💬 Real-time fan chat (Google sign-in + anonymous nicknames)
- 📅 Tour dates section
- 📨 Bookings & contact form
- 📱 Fully responsive
- ⚡ Server-side rendered & SEO-friendly

---

## 🛠 Getting Started

### 1. Install dependencies
```powershell
npm install
```

### 2. Set up environment variables
```powershell
Copy-Item .env.local.example .env.local
```
Then open `.env.local` and fill in the keys (see sections below).

### 3. Run the dev server
```powershell
npm run dev
```
Open <http://localhost:3000>.

---

## 🔑 API Setup Guides

### Spotify
1. Go to <https://developer.spotify.com/dashboard> and log in.
2. Click **Create app** → name it "LEOKOKO Website", any description.
3. Redirect URI: `http://localhost:3000` (any value works — we only use Client Credentials).
4. Copy the **Client ID** and **Client Secret** into `.env.local`.

### YouTube
1. Go to <https://console.cloud.google.com/>.
2. Create a project → enable **YouTube Data API v3**.
3. Credentials → Create credentials → **API key**.
4. Paste the key into `YOUTUBE_API_KEY` in `.env.local`.

### Supabase (chat & auth)
1. Create a free account at <https://supabase.com>.
2. New project → wait for it to provision.
3. Go to **Settings → API** → copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`
4. Run the SQL in `supabase/schema.sql` (SQL Editor → paste → Run).
5. Enable **Google** auth provider in **Authentication → Providers**.

---

## 📁 Project Structure
```
app/
  page.tsx              # Home (hero + about)
  music/page.tsx        # Spotify discography
  videos/page.tsx       # YouTube videos
  tour/page.tsx         # Tour dates
  community/page.tsx    # Fan chat
  contact/page.tsx      # Bookings/contact
  api/
    spotify/route.ts    # Spotify proxy
    youtube/route.ts    # YouTube proxy
components/             # Reusable React components
lib/                    # API clients, helpers
supabase/schema.sql     # DB schema for chat
```

---

## 🚀 Deploy

Recommended: **Vercel** (frontend) + **Supabase** (DB) — both free to start.

```powershell
npm run build
```

Then push to GitHub and import the repo into Vercel. Add all `.env.local` variables in Vercel's dashboard.

---

To God be the glory. 🙏
