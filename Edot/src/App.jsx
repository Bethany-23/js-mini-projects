import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { onAuthStateChanged } from "firebase/auth";

// Services & Store
import { auth } from "./services/firebase";
import { setUser, clearUser } from "./features/authSlice";
import { fetchFavorites } from "./features/favoritesSlice"; 

// Components & Pages
import Home from "./pages/Home.jsx";
import Favorites  from "./pages/Favorites.jsx";
import Details  from "./pages/Details.jsx";
import Nav from "./components/Navigation.jsx";

function App() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }),
        );

        // the fetch from the Cloud
        dispatch(fetchFavorites(user.uid));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Nav onCategoryClick={(category) => setSelectedCategory(category)} />
      <Routes>
        <Route path="/" element={<Home category={selectedCategory} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/fav" element={<Favorites />} />
      </Routes>
    </main>
  );
}

export default App;
