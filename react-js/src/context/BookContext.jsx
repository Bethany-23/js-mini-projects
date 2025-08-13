import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites((prev) => [...prev, book]);
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };

  const isFavorites = (bookId) => {
    return favorites.some((book) => book.id === bookId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorites,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
