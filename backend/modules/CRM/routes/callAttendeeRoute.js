// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Routes file for callAttendees

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateCallAttendee,
  validateUpdateCallAttendee,
} from "../../../utils/callAttendeeValidator.js";
import {
  createCallAttendee,
  getCallAttendee,
  getCalls,
  updateCallAttendee,
  deleteCallAttendee,
} from "../controllers/callAttendeeController.js";
const router = express.Router();

// Add an Attendee to a Call
router.post(
  "/call-attendees",
  cookieAuthMiddleware,
  createCallAttendee,
  validateCreateCallAttendee
);

// Get Attendees of a Call
router.get("/calls/:callId/attendees", cookieAuthMiddleware, getCallAttendee);

// Get Calls for a User
router.get("/users/:userId/calls", cookieAuthMiddleware, getCalls);

// Update an Attendee's Requirement
router.put(
  "/call-attendees/:id",
  cookieAuthMiddleware,
  updateCallAttendee,
  validateUpdateCallAttendee
);

// Remove an Attendee from a Call
router.delete("/call-attendees/:id", cookieAuthMiddleware, deleteCallAttendee);

export default router;
