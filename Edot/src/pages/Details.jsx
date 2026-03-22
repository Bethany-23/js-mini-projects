import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Details() {
  const { id } = useParams(); // 1. Get the ID from the URL

  // 2. Find this specific song in our list of songs (or favorites)
  // Advanced Tip: In a real app, you'd fetch by ID here if not in state
  const song = useSelector((state) => state.favorites.find((s) => s.id === id));

  if (!song) {
    return <p>Song details not found. Try searching from the Home page.</p>;
  }

  return (
    <div className="details-container">
      <h1>{song.title}</h1>
      <div className="video-placeholder">
        {/* This is where to put the YouTube Embed player */}
        <p>Playing video ID: {song.id}</p>
      </div>
      <p>Artist: {song.artist || "Unknown Artist"}</p>
    </div>
  );
}
