import { useEffect, useState } from "react";
import { getBook, deleteBook } from "../api/books";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBook().then((res) => setBooks(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks(books.filter((b) => b._id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 p-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
