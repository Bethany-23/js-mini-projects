import { useState } from "react";

export const useYoutube = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSongs = async (query) => {
    if (!query) return;
    setLoading(true);
    // Note - using the real api later
    const res = await fetch(`https://api.example.com/youtube?q=${query}`);
    const data = await res.json();
    setSongs(data.items || []);
    setLoading(false);
  };

  return { songs, loading, searchSongs };
};
