"use client";

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  season: string;
  setSeason: (value: string) => void;
}

export default function FilterBar({ search, setSearch, season, setSeason }: FilterBarProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Search episodes..."
        className="p-3 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-2 focus:ring-[#04CC9D] focus:border-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-[#04CC9D] focus:border-transparent"
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
  );
}
