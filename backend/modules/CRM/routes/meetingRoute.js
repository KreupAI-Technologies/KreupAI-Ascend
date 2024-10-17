// Author: Bosco Sabu John
// Date : 17/09/2024
// Version: 1.0
// Description: This is the model for the meetingAttendee collection

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateMeeting,
  validateUpdateMeeting,
} from "../../../utils/meetingsValidator.js";
import {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

// Create a new Meeting
router.post(
  "/meetings",
  cookieAuthMiddleware,
  validateCreateMeeting,
  createMeeting
);

// Get all Meetings
router.get("/meetings", cookieAuthMiddleware, getMeetings);

// Get a Meeting by ID
router.get("/meetings/:id", cookieAuthMiddleware, getMeetingById);

// Update a Meeting
router.put(
  "/meetings/:id",
  cookieAuthMiddleware,
  validateUpdateMeeting,
  updateMeeting
);

// Delete a Meeting
router.delete("/meetings/:id", cookieAuthMiddleware, deleteMeeting);

export default router;
