import { useState, useEffect } from "react";
import { fetchSongsWithCache } from "../services/youtube";
import SongCard from "../components/SongCard";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState("Orthodox Harp");

  const loadData = async (query) => {
    setLoading(true);
    const results = await fetchSongsWithCache(query);
    setSongs(results);
    setLoading(false);
  };

  useEffect(() => {
    loadData(currentSearch);
  }, [currentSearch]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Category Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-light mb-2">Spiritual Sanctuary</h1>
        <p className="opacity-60 italic">Current Mood: {currentSearch}</p>
      </header>

      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
