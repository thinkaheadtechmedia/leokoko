import Image from "next/image";
import type { YouTubeVideo } from "@/lib/youtube";

export default function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass overflow-hidden block hover:bg-white/[0.07] transition group"
    >
      <div className="relative aspect-video bg-royal-800">
        {video.thumbnail && (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-royal-950 text-2xl opacity-0 group-hover:opacity-100 transition shadow-2xl">
            ▶
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gold-100 font-semibold line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-royal-300/70 text-xs mt-2">
          {new Date(video.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </a>
  );
}
