import { validationResult } from "express-validator";
import Note from "../models/noteModel.js";

// Create a new Note
export const createNote = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const noteData = req.body;
        noteData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

        // Create a new Note instance
        const note = new Note(noteData);
        await note.save();

        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}


// Get all Notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find()
            .populate('collectionTypeId', 'statusDescription')
            .populate('parentNoteId', 'title')
            .populate('createdBy', 'firstName lastName username');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a Note by ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
            .populate('collectionTypeId', 'statusDescription')
            .populate('parentNoteId', 'title')
            .populate('createdBy', 'firstName lastName username');
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a Note
export const updateNote = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updates = req.body;

        const note = await Note.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        })
            .populate('collectionTypeId', 'statusDescription')
            .populate('parentNoteId', 'title')
            .populate('createdBy', 'firstName lastName username');

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a deleteNote
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}