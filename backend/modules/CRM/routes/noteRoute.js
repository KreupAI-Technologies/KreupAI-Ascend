import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateNote,
    validateUpdateNote
} from "../../../utils/noteValidator.js";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,

} from "../controllers/noteController.js";

const router = express.Router();

// Create a new Note
router.post(
    "/notes",
    cookieAuthMiddleware,
    validateCreateNote,
    createNote
);

// Get all Notes
router.get("/notes", cookieAuthMiddleware, getAllNotes);

// Get a Note by ID
router.get("/notes/:id", cookieAuthMiddleware, getNoteById);

// Update an Note
router.put(
    "/notes/:id/",
    cookieAuthMiddleware,
    validateUpdateNote,
    updateNote);

// Delete a Note
router.delete("/notes/:id", cookieAuthMiddleware, deleteNote);

export default router;
