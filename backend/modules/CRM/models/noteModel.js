// Author: Bosco Sabu John
// Date: 17/09/2024
// Version: v1.0
// Description: Note model

import mongoose from "mongoose";
// backend/models/note.model.js

const noteSchema = new mongoose.Schema(
    {
        notesDetail: {
            type: String,
            required: [true, 'Notes detail is required'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        collectionTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            required: [true, 'Collection Type is required'],
            validate: [
                {
                    validator: function (value) {
                        return mongoose.Types.ObjectId.isValid(value);
                    },
                    message: 'Invalid Collection Type ID',
                },
                {
                    validator: async function (value) {
                        // Validate that the statusGroup is 'Collections'
                        const Status = mongoose.model('Status');
                        const status = await Status.findById(value);
                        return status && status.statusGroup === 'COLLECTIONS';
                    },
                    message: 'Collection Type must belong to "Collections" status group',
                },
            ],
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Collection ID is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Collection ID',
            },
        },
        parentNoteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note',
            required: false,
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Parent Note ID',
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Created By is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Created By User ID',
            },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

// Polymorphic reference validation
noteSchema.pre('save', async function (next) {
    const note = this;
    const Status = mongoose.model('Status');
    const status = await Status.findById(note.collectionTypeId);

    if (!status || status.statusGroup !== 'COLLECTIONS') {
        return next(new Error('Collection Type must belong to "Collections" status group'));
    }

    const collectionName = status.statusDescription; // Check what this value actually is
    console.log('collectionName:', collectionName); // Add this line for debugging

    if (!mongoose.models[collectionName]) {
        return next(new Error(`Model "${collectionName}" is not registered`));
    }

    const Model = mongoose.model(collectionName);
    const exists = await Model.exists({ _id: note.collectionId });

    if (!exists) {
        return next(new Error(`Referenced document not found in ${collectionName} collection`));
    }

    next();
});


// Export the Note model
const Note = mongoose.model('Note', noteSchema);

export default Note;
