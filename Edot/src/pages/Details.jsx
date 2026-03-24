import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);

  // FIX: Point to state.favorites.items
  const song = useSelector((state) =>
    state.favorites.items.find((s) => s.id === id),
  );

  const handleToggle = () => {
    if (!user) return alert("Please login to save favorites!");
    dispatch(toggleFavorite({ song, userId: user.uid }));
  };

  if (!song) {
    return (
      <div className="p-10 text-center text-white">
        <p>Song details not found. Try searching from the Home page.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-400 underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-400">
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">{song.title}</h1>

      {/* Actual YouTube Player */}
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-6">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${song.id}?autoplay=1`}
          title={song.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex justify-between items-center glass p-6 rounded-xl">
        <div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Artist / Channel
          </p>
          <p className="text-xl font-medium">
            {song.channel || "Orthodox Harp Artist"}
          </p>
        </div>

        <button
          onClick={handleToggle}
          className={`px-6 py-2 rounded-full font-bold transition ${
            song.firebaseId
              ? "bg-red-500/20 text-red-500 border border-red-500"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {song.firebaseId ? "❤️ Saved to Vault" : "🤍 Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
