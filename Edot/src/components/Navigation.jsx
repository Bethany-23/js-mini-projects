import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export  function Nav() {
  // 1. Monitor the length of the favorites array
  const favCount = useSelector((state) => state.favorites.length);

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "#eee",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/fav">
        Favorites {favCount > 0 && <span>({favCount})</span>}
      </Link>
    </nav>
  );
}
