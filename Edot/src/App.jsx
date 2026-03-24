import { useEffect, useState } from "react"; // Added useState
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

// Services & Store
import { auth } from "./services/firebase";
import { setUser, clearUser } from "./features/authSlice";

// Components & Pages
import Home from "./pages/Home.jsx";
import  Favorites  from "./pages/Favorites.jsx";
import Details from "./pages/Details.jsx";
import  Nav  from "./components/Navigation.jsx";

function App() {
  const dispatch = useDispatch();

  // This state tracks which category was clicked (Tizita, Selamta, etc.)
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // This "Security Guard" watches for login/logout events 24/7
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // We only store the essentials to keep Redux fast
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }),
        );
      } else {
        dispatch(clearUser());
      }
    });

    // Cleanup the listener when the app closes
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* 1. We pass a function to Nav so it can "tell" App when a button is clicked */}
      <Nav onCategoryClick={(category) => setSelectedCategory(category)} />

      <Routes>
        {/* 2. We pass the selectedCategory to Home so it knows what to fetch */}
        <Route path="/" element={<Home category={selectedCategory} />} />

        {/* Added :id so the Details page can load specific Harp songs */}
        <Route path="/details/:id" element={<Details />} />
        <Route path="/fav" element={<Favorites />} />
      </Routes>
    </main>
  );
}

export default App;
