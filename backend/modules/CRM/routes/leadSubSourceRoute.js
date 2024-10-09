// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: Apps file for all the collections

import express from "express";
import {
  createLeadSubSource,
  deleteLeadSubSource,
  getLeadSubSourceById,
  getLeadSubSources,
  getLeadSubSourcesByLeadSourceId,
  updateLeadSubSource,
} from "../controllers/leadSubSourceController.js";

const router = express.Router();

// CREATE a new lead sub source
router.post("/lead-sub-sources", createLeadSubSource);

// READ all lead sub sources
router.get("/lead-sub-sources", getLeadSubSources);

// READ lead sub sources by Lead Source ID
router.get(
  "/lead-sub-sources/lead-source/:leadSourceId",
  getLeadSubSourcesByLeadSourceId
);

// READ a lead sub source by ID
router.get("/lead-sub-sources/:id", getLeadSubSourceById);

// UPDATE a lead sub source
router.put("/lead-sub-sources/:id", updateLeadSubSource);

// DELETE a lead sub source
router.delete("/lead-sub-sources/:id", deleteLeadSubSource);

export default router;
