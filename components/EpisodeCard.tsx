"use client";

import { Episode } from "@/lib/types";

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-gradient-to-tr from-[#04cc9d] via-[#1ea7ad] to-[#15a9ce] text-white transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-2">{episode.name}</h2>
      <p className="text-white">📅 {episode.air_date}</p>
      <p className="text-white">🎬 {episode.episode}</p>
    </div>
  );
}
