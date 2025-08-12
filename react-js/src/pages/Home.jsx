import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import { getPopularBooks, searchBooks } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularBooks = async () => {
      try {
        const popularBooks = await getPopularBooks();
        setBooks(popularBooks);
      } catch (err) {
        console.log(err);
        setError("failed to load books");
      } finally {
        setLoading(false);
      }
    };

    loadPopularBooks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim())return
    if(Loading) return

    setLoading(true)
    try{
        const searchResults = await searchBooks(searchQuery)
        setBooks(searchResults)
        setError(null)
    }catch (err){
        console.log(err)
        setError("failed to search book...")
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="Search-form">
        <input
          type="text"
          placeholder="Search for books here"
          className="Search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="Search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {Loading ? (
        <div className="loading">Loading ... </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
