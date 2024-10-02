import express from "express";
import {
  createClarification,
  getClarifications,
  getClarificationById,
  updateClarification,
  deleteClarification,
} from "../controllers/clarificationsController.js";

const router = express.Router();

// Create a new Clarification
router.post("/clarifications", createClarification);
// Get all Clarifications (optionally by incident_id)
router.get("/clarifications", getClarifications);
// Get a single Clarification by ID
router.get("/clarifications/:id", getClarificationById);
// Update a Clarification
router.put("/clarifications/:id", updateClarification);
// Delete a Clarification
router.delete("/clarifications/:id", deleteClarification);

export default router;
