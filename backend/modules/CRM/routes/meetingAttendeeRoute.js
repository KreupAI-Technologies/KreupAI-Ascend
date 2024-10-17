// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Routes file for all the collections

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateMeetingAttendee,
  validateUpdateMeetingAttendee,
} from "../../../utils/meetingAttendeeValidator.js";
import {
  createMeetingAttendee,
  getMeetingAttendee,
  getMeetingsForUser,
  updateMeetingAttendee,
  deleteMeetingAttendee,
} from "../controllers/meetingAttendeeController.js";
import {
  validateCreateMeetingAttendee,
  validateUpdateMeetingAttendee,
} from "../../../utils/meetingAttendeeValidator.js";
import { createMeetingAttendee } from "../controllers/meetingAttendeeController.js";

const router = express.Router();

// Add an Attendee to a Meeting
router.post(
  "/meeting-attendees",
  cookieAuthMiddleware,
  validateCreateMeetingAttendee,
  createMeetingAttendee
);

// Get Attendees of a Meeting
router.get(
  "/meetings/:meetingId/attendees",
  cookieAuthMiddleware,
  getMeetingAttendee
);

// Get Meetings for a User
router.get("/users/:userId/meetings", cookieAuthMiddleware, getMeetingsForUser);

// Update an Attendee's Requirement
router.put(
  "/meeting-attendees/:id",
  cookieAuthMiddleware,
  validateUpdateMeetingAttendee,
  updateMeetingAttendee
);

// Remove an Attendee from a Meeting
router.delete(
  "/meeting-attendees/:id",
  cookieAuthMiddleware,
  deleteMeetingAttendee
);

export default router;
