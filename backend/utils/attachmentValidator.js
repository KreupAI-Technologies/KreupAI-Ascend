import mongoose from "mongoose";
import { body } from "express-validator";
import upload from "../config/multerConfig.js";

export const validateCreateAttachment = [upload.single('file'), // Handle file upload
[
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
]];
