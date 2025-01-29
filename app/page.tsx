"use client"

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/episode";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

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
        setError("Failed to fetch episodes.");
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [page]);

  const filteredEpisodes = episodes.filter((episode) =>
    episode.name.toLowerCase().includes(search.toLowerCase()) &&
    (season ? episode.episode.startsWith(season) : true)
  );

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-green-500">Rick and Morty Episodes</h1>
      <div className="mb-4 flex flex-col md:flex-row justify-center gap-4">
        <input
          type="text"
          placeholder="Search episodes..."
          className="p-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="">All Seasons</option>
          {[...Array(5)].map((_, i) => (
            <option key={i} value={`S0${i + 1}`}>
              Season {i + 1}
            </option>
          ))}
        </select>
      </div>
      {loading && <p className="text-yellow-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEpisodes.map((episode) => (
          <div key={episode.id} className="border p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <h2 className="text-xl font-semibold mb-2">{episode.name}</h2>
            <p className="text-gray-300">{episode.air_date}</p>
            <p className="text-gray-400">{episode.episode}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={!info?.prev}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={!info?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
