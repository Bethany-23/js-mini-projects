import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useSelector } from "react-redux";

export default function Nav({ onCategoryClick }) {
  const user = useSelector((state) => state.auth?.user);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <nav className="glass p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold">HarpVault</h1>

      {/* Category Buttons */}
      <div className="flex gap-4">
        {["Tizita", "Selamta", "Cherinetih"].map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)} // 
            className="hover:text-blue-400 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {user ? (
        <button onClick={() => signOut(auth)}>
          Logout ({user.displayName})
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-600 px-4 py-1 rounded">
          Login
        </button>
      )}
    </nav>
  );
}
