import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import { validateCreateAttachment } from "../../../utils/attachmentValidator.js";
import {
    createAttachment,
    getAllAttachments,
    getAttachmentById,
    downloadAttachment,
    deleteAttachment,

} from "../controllers/attachmentController.js";

const router = express.Router();

// Create a new Attachment
router.post(
    "/attachments",
    cookieAuthMiddleware,
    validateCreateAttachment,
    createAttachment
);

// Get all Attachments
router.get("/attachments", cookieAuthMiddleware, getAllAttachments);

// Get a Attachment by ID
router.get("/attachments/:id", cookieAuthMiddleware, getAttachmentById);

// Download an Attachment
router.get("/attachments/:id/download", cookieAuthMiddleware, downloadAttachment);

// Delete a Attachment
router.delete("/attachments/:id", cookieAuthMiddleware, deleteAttachment);

export default router;
