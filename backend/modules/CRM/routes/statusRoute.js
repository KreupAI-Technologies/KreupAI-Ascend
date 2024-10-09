// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the routes for the statuses collection.

import express from "express";
import {
  createStatus,
  deleteStatus,
  getStatusById,
  getStatuses,
  getStatusesByStatusGroup,
  searchStatuses,
  updateStatus,
} from "../controllers/statusController.js";

const router = express.Router();

// CREATE a new status
router.post("/statuses", createStatus);

// READ all statuses
router.get("/statuses", getStatuses);

// READ statuses by status group
router.get("/statuses/group/:statusGroup", getStatusesByStatusGroup);

// READ a status by ID
router.get("/statuses/:id", getStatusById);

// UPDATE a status
router.put("/statuses/:id", updateStatus);

// DELETE a status
router.delete("/statuses/:id", deleteStatus);

// SEARCH statuses by status group or description
router.get("/statuses/search", searchStatuses);

export default router;
