import { Routes,Route } from "react-router-dom";
import {Home} from "./pages/Home.jsx"
import { Favorites } from "./pages/Favorites.jsx";
import { Details} from "./pages/Details.jsx";
import { Nav } from "./components/Navigation.jsx";

function App(){
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/fav" element={<Favorites />} />
      </Routes>
    </main>
  );
 
}

export default App;