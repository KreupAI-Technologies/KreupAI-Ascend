import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateContact,
  validateUpdateContact,
} from "../../../utils/contactValidator.js";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../controllers/contactController.js";
const router = express.Router();

// Create a new Contact
router.post(
  "/contacts",
  cookieAuthMiddleware,
  validateCreateContact,
  createContact
);

// Get all Contacts
router.get("/contacts", cookieAuthMiddleware, getContacts);

// Get a Contact by ID
router.get("/contacts/:id", cookieAuthMiddleware, getContactById);

// Update a Contact
router.put(
  "/contacts/:id",
  cookieAuthMiddleware,
  validateUpdateContact,
  updateContact
);

// Delete a Contact
router.delete("/contacts/:id", cookieAuthMiddleware, deleteContact);

export default router;
