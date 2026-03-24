import { useState, useEffect } from "react";
import { fetchSongsWithCache } from "../services/youtube";
import SongCard from "../components/songCard.jsx";

export default function Home({ category }) {
  // 👈 We take 'category' as a prop
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSongs = async () => {
      setLoading(true);
      // If no category is clicked, default to general Harp songs
      const query = category || "Orthodox Harp";
      const results = await fetchSongsWithCache(query);
      setSongs(results);
      setLoading(false);
    };
    getSongs();
  }, [category]); // 👈 Re-run whenever category changes

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading ? (
        <p>Seeking spiritual melodies...</p>
      ) : (
        songs.map((song) => <SongCard key={song.id} song={song} />)
      )}
    </div>
  );
}
