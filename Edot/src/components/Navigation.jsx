import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const CATEGORIES = ["Tizita", "Selamta", "Cherinetih"];

export  function Nav({ onCategoryClick }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="glass sticky top-4 mx-4 z-50 p-4 flex justify-between items-center mb-8">
      <Link
        to="/"
        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
      >
        HarpVault
      </Link>

      <div className="hidden md:flex gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)}
            className="px-4 py-1 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/fav" className="hover:text-blue-400">
          Favorites
        </Link>
        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="text-sm opacity-70 hover:opacity-100"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 px-4 py-2 rounded-lg text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
