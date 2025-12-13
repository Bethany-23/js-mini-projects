import Note from "../models/note.js";

export const addNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(note);
};

export const getNotes = async (req, res) => {
  const notes = await Note.find({ createdBy: req.user.id });
  res.json(notes);
};

export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};
