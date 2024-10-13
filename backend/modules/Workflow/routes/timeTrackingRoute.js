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

router.post("/", createTimeTrackingEntry);
router.get("/", getAllTimeTrackingEntries);
router.get("/:id", getTimeTrackingEntryById);
router.put("/:id", updateTimeTrackingEntry);
router.delete("/:id", deleteTimeTrackingEntry);

export default router;
