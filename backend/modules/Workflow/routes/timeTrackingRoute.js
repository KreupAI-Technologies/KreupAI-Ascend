//Debayan
//21.9.24

import express from "express";
import {
  getAllTimeTrackingEntries,
  getTimeTrackingEntryById,
  createTimeTrackingEntry,
  updateTimeTrackingEntry,
  deleteTimeTrackingEntry,
} from "../controllers/timeTrackingController.js";

const router = express.Router();

router.post("/timeTracking", createTimeTrackingEntry);
router.get("/timeTracking", getAllTimeTrackingEntries);
router.get("/timeTracking/:id", getTimeTrackingEntryById);
router.put("/timeTracking/:id", updateTimeTrackingEntry);
router.delete("/timeTracking/:id", deleteTimeTrackingEntry);

export default router;
