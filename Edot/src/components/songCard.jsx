import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";
import { Link } from "react-router-dom";

export default function SongCard({ song }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isFav = useSelector((state) =>
    state.favorites.items.some((f) => f.id === song.id),
  );

  const handleFav = (e) => {
    e.preventDefault();
    if (!user) return alert("Login to save favorites!");
    dispatch(toggleFavorite({ song, userId: user.uid }));
  };

  return (
    <div className="glass p-4 flex flex-col gap-4 group transition-all duration-500 hover:scale-[1.02]">
      <img
        src={song.thumb}
        className="rounded-xl h-40 object-cover opacity-80 group-hover:opacity-100 transition"
      />
      <h3 className="font-medium text-sm line-clamp-2 h-10">{song.title}</h3>
      <div className="flex justify-between items-center mt-auto">
        <Link
          to={`/details/${song.id}`}
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          LISTEN NOW
        </Link>
        <button
          onClick={handleFav}
          className={`text-xl transition ${isFav ? "text-red-500" : "text-white/20 hover:text-white/50"}`}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
