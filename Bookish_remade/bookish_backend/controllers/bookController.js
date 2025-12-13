
import Book from "../models/Book.js";
import Progress from "../models/Progress.js";

/**
 * Create a new book
 */
export const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      createdBy: req.user.id
    });

    // Create initial progress (0%)
    await Progress.create({
      user: req.user.id,
      book: book._id,
      totalPages: book.pages || 0,
      currentPage: 0,
      percentage: 0,
      status: "unread"
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Update book status and sync progress
 */
export const updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bookId = req.params.id;
    const userId = req.user.id;

    if (!["to be read", "reading", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const book = await Book.findOne({
      _id: bookId,
      createdBy: userId
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update book status
    book.status = status;
    await book.save();

    // Get progress
    const progress = await Progress.findOne({
      book: bookId,
      user: userId
    });

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    // 🔥 CORE BUSINESS LOGIC
    if (status === "completed") {
      progress.currentPage = progress.totalPages;
      progress.percentage = 100;
      progress.status = "completed";
    }

    if (status === "to be read") {
      progress.currentPage = 0;
      progress.percentage = 0;
      progress.status = "unread";
    }

    if (status === "reading") {
      progress.status = "reading";
    }

    await progress.save();

    res.json({ book, progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a book and its progress
 */
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    await Book.findOneAndDelete({ _id: bookId, createdBy: userId });
    await Progress.findOneAndDelete({ book: bookId, user: userId });

    res.json({ message: "Book removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
