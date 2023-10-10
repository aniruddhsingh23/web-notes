const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

exports.getnote = asyncHandler(async (req, res) => {
  const data = await Note.find({ userId: req.user._id });
  res.json(data);
});
exports.createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("please Fill All the feilds");
  } else {
    const note = await Note.create({
      userId: req.user._id,
      title,
      content,
      category,
    });
    const notecreate = await note.save();
    res.status(201).json(notecreate);
  }
});

exports.getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(404).json({ message: "Note Not Found" });
  }
});

exports.UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You Can't perform this action");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const UpdateNote = await note.save();
    res.json(UpdateNote);
  } else {
    res.status(404).json({ message: "Note Not Found" });
  }
});
exports.deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You Can't perform this action");
  }
  if (note) {
    await note.remove();

    res.json({ message: "Note Removed" });
  } else {
    res.status(404).json({ message: "Note Not Found" });
  }
});
