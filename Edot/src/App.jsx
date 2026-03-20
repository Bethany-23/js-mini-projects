import { Router,Route } from "react-router-dom";
import {Home} from "../src/components/Home.jsx"
import { Favorties } from "./components/Favorites.jsx";
import { Details} from "./components/Details.jsx";
import { Nav } from "./context/Navigation.jsx";

function App(){
  <BrowserRouter>
  <Nav/>
  <Routes>
    <Route path= "/" element={<Home/>}/>
    <Route path= "/details" element={<Details/>}/>
    <Route path= "/fav" element={<Favorties/>}/>
  </Routes>
  </BrowserRouter>
}

export default App;