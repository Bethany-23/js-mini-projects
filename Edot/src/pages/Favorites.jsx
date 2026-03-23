import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";
import { Link } from "react-router-dom";

export  function Favorites() {
  // 1. Grab the favorites array from the Global Store
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <p>
        Your playlist is empty. <Link to="/">Go find some tunes!</Link>
      </p>
    );
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites ❤️</h1>
      <div className="song-grid">
        {favorites.map((song) => (
          <div key={song.id} className="song-card">
            <h3>{song.title}</h3>
            {/* 2. We can even remove them from here! */}
            <button onClick={() => dispatch(toggleFavorite(song))}>
              Remove from Favorites
            </button>
            <Link to={`/details/${song.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
