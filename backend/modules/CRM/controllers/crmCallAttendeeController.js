// controllers/callAttendeeController.js

import CallAttendee from '../models/crmCallAttendee.js';
import Call from '../models/crmCall.js';
// import User from '../models/User.js';
import asyncHandler from 'express-async-handler';


const createCallAttendee = asyncHandler(async (req, res) => {
  const { callId, userId, requirement } = req.body;

  // Check if the associated Call exists
  const callExists = await Call.findById(callId);
  if (!callExists) {
    res.status(400);
    throw new Error('Associated Call does not exist.');
  }

  // Check if the associated User exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(400);
    throw new Error('Associated User does not exist.');
  }

  // Check for duplicate CallAttendee entry
  const existingAttendee = await CallAttendee.findOne({ callId, userId });
  if (existingAttendee) {
    res.status(400);
    throw new Error('User is already an attendee for this Call.');
  }

  const callAttendee = new CallAttendee({
    callId,
    userId,
    requirement,
  });

  const createdAttendee = await callAttendee.save();
  res.status(201).json(createdAttendee);
});

const getCallAttendees = asyncHandler(async (req, res) => {
  const attendees = await CallAttendee.find()
    .populate('callId', 'date fromTime toTime callTypeId')
    .populate('userId', 'name email');
  res.json(attendees);
});


const getCallAttendeeById = asyncHandler(async (req, res) => {
  const attendee = await CallAttendee.findById(req.params.id)
    .populate('callId', 'date fromTime toTime callTypeId')
    .populate('userId', 'name email');

  if (attendee) {
    res.json(attendee);
  } else {
    res.status(404);
    throw new Error('Call Attendee not found');
  }
});


const updateCallAttendee = asyncHandler(async (req, res) => {
  const { callId, userId, requirement } = req.body;

  const attendee = await CallAttendee.findById(req.params.id);

  if (attendee) {
    // If updating callId, verify the new Call exists
    if (callId && callId !== attendee.callId.toString()) {
      const callExists = await Call.findById(callId);
      if (!callExists) {
        res.status(400);
        throw new Error('Associated Call does not exist.');
      }
      attendee.callId = callId;
    }

    // If updating userId, verify the new User exists and check for duplicates
    if (userId && userId !== attendee.userId.toString()) {
      const userExists = await User.findById(userId);
      if (!userExists) {
        res.status(400);
        throw new Error('Associated User does not exist.');
      }

      const duplicateAttendee = await CallAttendee.findOne({ callId: attendee.callId, userId });
      if (duplicateAttendee) {
        res.status(400);
        throw new Error('User is already an attendee for this Call.');
      }

      attendee.userId = userId;
    }

    // Update other fields
    attendee.requirement = requirement !== undefined ? requirement : attendee.requirement;
    attendee.modifiedAt = new Date();

    const updatedAttendee = await attendee.save();
    res.json(updatedAttendee);
  } else {
    res.status(404);
    throw new Error('Call Attendee not found');
  }
});


const deleteCallAttendee = asyncHandler(async (req, res) => {
  const attendee = await CallAttendee.findById(req.params.id);

  if (attendee) {
    await attendee.remove();
    res.json({ message: 'Call Attendee removed' });
  } else {
    res.status(404);
    throw new Error('Call Attendee not found');
  }
});

export {
  createCallAttendee,
  getCallAttendees,
  getCallAttendeeById,
  updateCallAttendee,
  deleteCallAttendee,
};
