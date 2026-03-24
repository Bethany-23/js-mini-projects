import { useState, useEffect } from "react";
import { fetchSongsWithCache } from "../services/youtube";
import SongCard from "../components/songCard.jsx";

export default function Home({ category }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSongs = async () => {
      setLoading(true);
      const query = category || "Orthodox Harp";
      const results = await fetchSongsWithCache(query);
      setSongs(results);
      setLoading(false);
    };
    getSongs();
  }, [category]);

  return (
    <div className="container mx-auto px-6 pb-20">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2 capitalize">
          {category || "Spiritual Sanctuary"}
        </h2>
        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-400 font-medium">
            Fetching mezmur
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
