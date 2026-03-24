import { Link } from "react-router-dom";

export default function SongCard({ song }) {
  return (
    <div className="glass glass-card p-4 flex flex-col gap-4">
      <img
        src={song.thumb}
        alt={song.title}
        className="rounded-lg w-full h-48 object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold line-clamp-2">{song.title}</h3>
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={`/details/${song.id}`}
          className="text-blue-400 text-sm hover:underline"
        >
          View Details
        </Link>
        <button className="p-2 rounded-full hover:bg-white/10 text-pink-500">
          ♥
        </button>
      </div>
    </div>
  );
}
