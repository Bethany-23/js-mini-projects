// api.js

const BASE_URL = "https://openlibrary.org";

export const getPopularBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?q=bestseller`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

   return data.docs.slice(0, 10).map(book => ({
  id: book.key,
  title: book.title,
  author: book.author_name ? book.author_name.join(", ") : "Unknown",
  release_date: book.first_publish_year || "N/A",
  
  olid: book.cover_edition_key || (book.edition_key ? book.edition_key[0] : null),
  
  cover_url: book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null
}));

  } catch (error) {
    console.error("Error fetching popular books:", error);
    return [];
  }
};

// Search books by a search term
export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.docs.slice(0, 10).map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      release_date: book.first_publish_year || "N/A",
      cover_url: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null
    }));

  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};
