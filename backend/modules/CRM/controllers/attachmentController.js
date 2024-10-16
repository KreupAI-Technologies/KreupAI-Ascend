import { validationResult } from "express-validator";
import Attachment from "../models/attachmentModel.js";
import fs from 'fs';

// Create a new Attachment
export const createAttachment = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Delete the uploaded file if validation fails
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const attachmentData = {
            collectionTypeId: req.body.collectionTypeId,
            collectionId: req.body.collectionId,
            filename: req.file.path, // Store the file path
            createdBy: req.user.userId, // Assuming `authMiddleware` adds `userId` to `req.user`
        };

        // Create a new Attachment instance
        const attachment = new Attachment(attachmentData);
        await attachment.save();

        res.status(201).json(attachment);
    } catch (error) {
        // Delete the uploaded file in case of error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ message: error.message });
    }
}

// Get Attachments by Collection Type and Collection ID
export const getAttachments = async (req, res) => {
    try {
        const { collectionTypeId, collectionId } = req.query;

        if (!collectionTypeId || !collectionId) {
            return res.status(400).json({ message: 'collectionTypeId and collectionId are required' });
        }

        const attachments = await Attachment.find({
            collectionTypeId,
            collectionId,
        })
            .populate('collectionTypeId', 'statusDescription')
            .populate('createdBy', 'firstName lastName username');

        res.json(attachments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get an Attachment by ID
export const getAttachmentById = async (req, res) => {
    try {
        const attachment = await Attachment.findById(req.params.id)
            .populate('collectionTypeId', 'statusDescription')
            .populate('createdBy', 'firstName lastName username');

        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        res.json(attachment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Download an Attachment
export const downloadAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.findById(req.params.id);

        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        res.download(attachment.filename);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete an Attachment
export const deleteAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.findByIdAndDelete(req.params.id);

        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        // Delete the file from the filesystem
        fs.unlinkSync(attachment.filename);

        res.json({ message: 'Attachment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}