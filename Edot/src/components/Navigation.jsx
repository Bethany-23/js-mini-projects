import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useSelector } from "react-redux";

export default function Nav({ onCategoryClick }) {
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogoClick = () => {
    onCategoryClick(""); // Reset category to default
    navigate("/");
  };

  return (
    <nav className="glass sticky top-0 z-50 px-8 py-4 flex justify-between items-center mb-8 border-b border-white/5">
      {/* 1. Left Side: Branding */}
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={handleLogoClick}
      >
        <div className="w-10 h-10 bg-emerald-500 rounded-xl blur-[1px] group-hover:blur-0 transition-all flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-black font-black text-xl">E</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
          EDOT
        </h1>
      </div>

      {/* 2. Center: Transparent Category Buttons */}
      <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
        {["Tizita", "Selamta", "Cherinetih"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              onCategoryClick(cat);
              navigate("/");
            }}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all hover:bg-emerald-500/10 hover:text-emerald-400 text-gray-300"
          >
            {cat}
          </button>
        ))}

        {/* Separator */}
        <div className="w-[1px] h-4 bg-white/10 mx-2"></div>

        {/* My Vault Link */}
        <Link
          to="/fav"
          className="px-6 py-2 rounded-full text-sm font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
        >
          My Vault
        </Link>
      </div>

      {/* 3. Right Side: Login/User Profile Area */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">
                Active Member
              </p>
              <p className="text-sm font-medium text-white">
                {user.displayName}
              </p>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="glass-green px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all border border-transparent"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-emerald-500 text-black px-8 py-2.5 rounded-full font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 hover:bg-emerald-400 active:scale-95 transition-all"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
