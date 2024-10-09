import express from "express";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  searchLeads,
  updateLead,
} from "../controllers/leadController.js";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";

const router = express.Router();

// Create a new Lead
router.post("/leads", cookieAuthMiddleware, createLead);

// Get all Leads
router.get("/leads", cookieAuthMiddleware, getLeads);

// Get a Lead by ID
router.get("/leads/:id", cookieAuthMiddleware, getLeadById);

// Update a Lead
router.put("/leads/:id", cookieAuthMiddleware, updateLead);

// Delete a Lead
router.delete("/leads/:id", cookieAuthMiddleware, deleteLead);

// SEARCH for Leads
router.get("/leads/search", cookieAuthMiddleware, searchLeads);

export default router;
