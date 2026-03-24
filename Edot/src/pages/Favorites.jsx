import { useSelector } from "react-redux";
import SongCard from "../components/SongCard";

export default function Favorites() {
  const { items } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.auth);

  if (!user)
    return (
      <div className="p-20 text-center">Please login to see your Vault.</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-light mb-8 border-b border-white/10 pb-4">
        My Spiritual Collection
      </h2>
      {items.length === 0 ? (
        <p className="opacity-50">
          Your vault is empty. Start exploring Tizita or Selamta!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((song) => (
            <SongCard key={song.id} song={song} isFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}
