import "../css/Favorites.css";
import { useBookContext } from "../context/BookContext";
import BookCard from "../components/BookCard";

function Favorites() {
  const { favorites } = useBookContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="books-grid">
          {favorites.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1> this is your favorites page</h1>
      <p> add your favorite books here! </p>
    </div>
  );
}

export default Favorites;
