import mongoose from "mongoose";
import { validationResult } from "express-validator";
import CallAttendee from "../models/callAttendeeModel.js";

export const createCallAttendee = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const attendeeData = req.body;

    // Create a new CallAttendee instance
    const attendee = new CallAttendee(attendeeData);
    await attendee.save();

    res.status(201).json(attendee);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ message: "User is already an attendee of this call" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getCallAttendeesByCallId = async (req, res) => {
  try {
    const { callId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(callId)) {
      return res.status(400).json({ message: "Invalid Call ID" });
    }

    const attendees = await CallAttendee.find({ callId })
      .populate("userId", "firstName lastName username")
      .populate("callId");

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCallsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const calls = await CallAttendee.find({ userId }).populate({
      path: "callId",
      populate: [
        { path: "collectionTypeId", select: "name" },
        { path: "callTypeId", select: "name" },
        { path: "salesmanId", select: "firstName lastName username" },
        { path: "createdBy", select: "firstName lastName username" },
      ],
    });

    res.json(calls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCallAttendee = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;

    const attendee = await CallAttendee.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("callId")
      .populate("userId", "firstName lastName username");

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json(attendee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCallAttendee = async (req, res) => {
  try {
    const attendee = await CallAttendee.findByIdAndDelete(req.params.id);

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json({ message: "Attendee removed from call successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
