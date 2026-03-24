import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";

export default function SongCard({ song }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  // Check if this specific song is in our favorites array
  const isFav = useSelector((state) =>
    state.favorites.items.some((f) => f.id === song.id),
  );

  const handleLike = (e) => {
    e.stopPropagation(); // Prevents clicking the heart from opening the details page
    if (!user) return alert("Please login to save to your vault!");
    dispatch(toggleFavorite({ song, userId: user.uid }));
  };

  return (
    <div
      onClick={() => navigate(`/details/${song.id}`)}
      className="glass-card group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 bg-white/5 p-3"
    >
      {/* 1. The "Like" Heart Button */}
      <button
        onClick={handleLike}
        className="absolute top-5 left-5 z-10 p-2 rounded-full glass transition-all hover:scale-110 active:scale-90"
      >
        <svg
          className={`w-5 h-5 ${isFav ? "fill-emerald-400 text-emerald-400" : "text-white/50"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <img
          src={song.thumb}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
      </div>

      {/* Title & Artist */}
      <div className="mt-4 px-2 pb-2">
        <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-emerald-400">
          {song.title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">{song.channel}</p>
      </div>
    </div>
  );
}
