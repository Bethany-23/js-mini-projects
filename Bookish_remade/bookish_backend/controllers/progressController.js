import Progress from "../models/progress.js";

export const addProgress = async (req, res) => {
  const { currentPage, totalPages, book } = req.body;

  const percentage = Math.round((currentPage / totalPages) * 100);

  const progress = await Progress.create({
    user: req.user.id,
    book,
    currentPage,
    totalPages,
    percentage,
    status: percentage === 100 ? "completed" : "reading"
  });

  res.status(201).json(progress);
};
