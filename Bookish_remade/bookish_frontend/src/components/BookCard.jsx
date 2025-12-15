const BookCard = ({ book, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{book.title}</h3>
      <p>Status: {book.status}</p>
      <button
        onClick={() => onDelete(book._id)}
        className="text-red-500 mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default BookCard;
