# Images

Drop your image files into this folder using the **exact filenames** below.
The site is already wired up to display them — no code changes required.

If a file is missing, the site still works (it falls back to the existing
gold/royal gradient backgrounds), so you can add images one at a time.

---

## Required filenames

| Filename                | Used on            | Recommended size       | Notes                                                                 |
| ----------------------- | ------------------ | ---------------------- | --------------------------------------------------------------------- |
| `hero.jpg`              | Home — Hero banner | **1920 × 1080** (16:9) | Portrait or stage shot. Will be darkened with a royal/gold overlay.   |
| `portrait.jpg`          | Home — About block | **800 × 1000** (4:5)   | Vertical portrait. Sits next to the bio text.                         |
| `verse-bg.jpg`          | Home — Verse banner| **1920 × 800**         | Soft / atmospheric. Heavily blurred & overlaid behind the Psalm 96:1. |
| `gallery-1.jpg`         | Home — Gallery strip| **800 × 800** (square)| Performance / studio shot                                             |
| `gallery-2.jpg`         | Home — Gallery strip| **800 × 800** (square)| Worship / crowd shot                                                  |
| `gallery-3.jpg`         | Home — Gallery strip| **800 × 800** (square)| Behind-the-scenes shot                                                |
| `gallery-4.jpg`         | Home — Gallery strip| **800 × 800** (square)| Album / promo shot                                                    |
| `og-image.jpg`          | Social previews    | **1200 × 630**         | Shown when the site is shared on WhatsApp, X, Facebook, etc.          |
| `logo-mark.png`         | Footer brand mark  | **512 × 512** (PNG, transparent) | Optional. A small crown/cross/monogram next to the LEOKOKO name. |

> `.jpg` is recommended for photos (smaller file size).
> Use `.png` only when you need transparency (e.g. the logo mark).
> `.webp` and `.avif` also work — just match the filename and extension in the components if you change them.

---

## How to add more images later

1. Drop the file into `public/images/`.
2. Reference it in any component as `/images/your-file.jpg`
   (the `public/` part is omitted — Next.js serves it from the root).
3. For best performance, use `next/image`:

```tsx
import Image from "next/image";

<Image src="/images/your-file.jpg" alt="..." width={800} height={600} />
```
