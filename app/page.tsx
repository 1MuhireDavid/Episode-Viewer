"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Episode } from "@/lib/types";
import { ApiResponse } from "@/lib/types";
import FilterBar from "@/components/FilterBar"; 
import EpisodeCard from "@/components/EpisodeCard"; // Import the new component

const API_URL = process.env.NEXT_PUBLIC_API_URL1;

export default function Home() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [info, setInfo] = useState<ApiResponse["info"] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [season, setSeason] = useState<string>("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ApiResponse>(`${API_URL}?page=${page}`);
        setEpisodes(response.data.results);
        setInfo(response.data.info);
      } catch (err) {
        setError("Failed to fetch episodes."+err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [page]);

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(search.toLowerCase()) &&
      (season ? episode.episode.startsWith(season) : true)
  );
  return ( 
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-[#04CC9D]">Rick and Morty Episodes</h1>

      {/* Filter Component */}
      <div className="mb-6">
        <FilterBar search={search} setSearch={setSearch} season={season} setSeason={setSeason} />
      </div>

      {loading && <p className="text-yellow-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEpisodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-5 py-2 bg-gradient-to-tr from-[#04cc9d] via-[#1ea7ad] to-[#15a9ce] text-white rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={!info?.prev}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 bg-gradient-to-tr from-[#04cc9d] via-[#1ea7ad] to-[#15a9ce] text-white rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={!info?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
