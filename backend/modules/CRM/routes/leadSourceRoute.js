// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the lead sources collection and creates the LeadSource model.

import express from "express";
import {
  createLeadSource,
  deleteLeadSource,
  getLeadSources,
  getLeadSourceById,
  searchLeadSource,
  updateLeadSource,
} from "../controllers/leadSourceController.js";

const router = express.Router();

// CREATE a new lead source
router.post("/lead-sources", createLeadSource);

// READ all lead sources
router.get("/lead-sources", getLeadSources);

// READ a lead source by ID
router.get("/lead-sources/:id", getLeadSourceById);

// UPDATE a lead source
router.put("/lead-sources/:id", updateLeadSource);

// DELETE a lead source
router.delete("/lead-sources/:id", deleteLeadSource);

// SEARCH lead sources by code or name
router.get("/lead-sources/search", searchLeadSource);

export default router;
