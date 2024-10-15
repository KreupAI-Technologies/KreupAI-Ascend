import mongoose from "mongoose";
import { body } from "express-validator";
import Note from "../modules/CRM/models/noteModel.js";

export const validateCreateNote = [
    body('notesDetail')
        .notEmpty()
        .withMessage('Notes detail is required'),
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('collectionTypeId')
        .notEmpty()
        .withMessage('Collection Type ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'COLLECTIONS') {
                throw new Error('Collection Type must belong to "Collections" status group');
            }
            return true;
        }),
    body('collectionId')
        .notEmpty()
        .withMessage('Collection ID is required')
        .custom(async (value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection ID');
            }
            // Validate that the collectionId exists in the specified collection
            const Status = mongoose.model('Status');
            const status = await Status.findById(req.body.collectionTypeId);
            if (!status) {
                throw new Error('Invalid Collection Type');
            }
            const collectionName = status.statusDescription;
            const Model = mongoose.model(collectionName);
            const exists = await Model.exists({ _id: value });
            if (!exists) {
                throw new Error(`Referenced document not found in ${collectionName} collection`);
            }
            return true;
        }),
    body('parentNoteId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Parent Note ID');
            }
            const exists = await Note.exists({ _id: value });
            if (!exists) {
                throw new Error('Parent Note not found');
            }
            return true;
        }),
];

export const validateUpdateNote = [
    body('notesDetail')
        .optional()
        .notEmpty()
        .withMessage('Notes detail cannot be empty'),
    body('title')
        .optional()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('collectionTypeId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'COLLECTIONS') {
                throw new Error('Collection Type must belong to "Collections" status group');
            }
            return true;
        }),
    body('collectionId')
        .optional()
        .custom(async (value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection ID');
            }
            // Validate that the collectionId exists in the specified collection
            const Status = mongoose.model('Status');
            const collectionTypeId = req.body.collectionTypeId || (await Note.findById(req.params.id)).collectionTypeId;
            const status = await Status.findById(collectionTypeId);
            if (!status) {
                throw new Error('Invalid Collection Type');
            }
            const collectionName = status.statusDescription;
            const Model = mongoose.model(collectionName);
            const exists = await Model.exists({ _id: value });
            if (!exists) {
                throw new Error(`Referenced document not found in ${collectionName} collection`);
            }
            return true;
        }),
    body('parentNoteId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Parent Note ID');
            }
            const exists = await Note.exists({ _id: value });
            if (!exists) {
                throw new Error('Parent Note not found');
            }
            return true;
        }),
];