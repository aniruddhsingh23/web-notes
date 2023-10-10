const express = require("express");
const {
  getnote,
  createNote,
  getNoteById,
  UpdateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.get("/", protect, getnote);
router.post("/create", protect, createNote);
router.get("/:id", getNoteById);
router.put("/:id", protect, UpdateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
