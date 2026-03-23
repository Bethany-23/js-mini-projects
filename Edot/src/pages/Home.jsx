import { useState } from "react";
import { useYoutube } from "../hooks/useYoutube";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";

export  function Home() {
  const [query, setQuery] = useState("");
  const { songs, loading, searchSongs } = useYoutube();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="home-container">
      <h1>Music Vault</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => searchSongs(query)}>Search</button>

      {loading && <p>Loading...</p>}

      <div className="song-grid">
        {songs.map((song) => (
          <div key={song.id} className="song-card">
            <p>{song.title}</p>
            <button onClick={() => dispatch(toggleFavorite(song))}>
              {favorites.find((f) => f.id === song.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
