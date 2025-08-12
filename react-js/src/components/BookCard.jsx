import "../css/BookCard.css";

function BookCard({ book }) {
  function onFavClick() {
    alert("clicked");
  }
  return (
    <div className="book-card">
      <div className="book-cover">
        <img
          src={
            book.olid
              ? `https://covers.openlibrary.org/b/olid/${book.olid}-M.jpg`
              : book.cover_url ||
                "https://via.placeholder.com/128x193?text=No+Cover"
          }
          alt={book.title}
        />
        <div className="book-overlay">
          <button className="favorite-btn" onClick={onFavClick}>
            ❤
          </button>
        </div>
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.release_date}</p>
      </div>
    </div>
  );
}

export default BookCard;
