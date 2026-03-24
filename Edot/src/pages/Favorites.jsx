import { useSelector } from "react-redux";
import SongCard from "../components/songCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { items: favSongs, loading } = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <p className="text-gray-400 mb-4">
          You need to be logged in to view your Vault.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pb-20">
      <header className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">
          My collection
        </h2>
        <p className="text-emerald-400/60 uppercase text-xs tracking-widest font-bold">
          {favSongs.length} Saved Melodies
        </p>
      </header>

      {favSongs.length === 0 ? (
        <div className="glass p-12 text-center rounded-3xl border-dashed border-white/10">
          <p className="text-gray-400">
            Your vault is empty. Start exploring Tizita and Selamta!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
