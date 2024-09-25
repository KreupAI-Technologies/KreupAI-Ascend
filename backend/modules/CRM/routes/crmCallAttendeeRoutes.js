// routes/callAttendeeRoutes.js

import express from 'express';
import {
  createCallAttendee,
  getCallAttendees,
  getCallAttendeeById,
  updateCallAttendee,
  deleteCallAttendee,
} from '../controllers/crmCallAttendeeController.js';

const router = express.Router();

// Route to create a new Call Attendee and get all Call Attendees
router.route('/')
  .post(createCallAttendee)    // Create a new Call Attendee
  .get(getCallAttendees);      // Get all Call Attendees

// Routes to get, update, and delete a Call Attendee by ID
router.route('/:id')
  .get(getCallAttendeeById)    // Get a Call Attendee by ID
  .put(updateCallAttendee)     // Update a Call Attendee
  .delete(deleteCallAttendee); // Delete a Call Attendee

export default router;
