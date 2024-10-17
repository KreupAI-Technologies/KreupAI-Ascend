import { validationResult } from "express-validator";
import MeetingAttendee from "../models/meetingAttendeeModel.js";

export const createMeetingAttendee = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const attendeeData = req.body;

    // Create a new MeetingAttendee instance
    const attendee = new MeetingAttendee(attendeeData);
    await attendee.save();

    // Populate references for the response
    await attendee
      .populate("meetingId")
      .populate("userId", "firstName lastName username")
      .execPopulate();

    res.status(201).json(attendee);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ message: "User is already an attendee of this meeting" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getMeetingAttendee = async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      return res.status(400).json({ message: "Invalid Meeting ID" });
    }

    const attendees = await MeetingAttendee.find({ meetingId })
      .populate("userId", "firstName lastName username")
      .populate("meetingId");

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeetingsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const meetings = await MeetingAttendee.find({ userId }).populate({
      path: "meetingId",
      populate: [
        { path: "collectionTypeId", select: "name" },
        { path: "meetingTypeId", select: "name" },
        { path: "salesmanId", select: "firstName lastName username" },
        { path: "createdBy", select: "firstName lastName username" },
      ],
    });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMeetingAttendee = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;

    const attendee = await MeetingAttendee.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("meetingId")
      .populate("userId", "firstName lastName username");

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json(attendee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMeetingAttendee = async (req, res) => {
  try {
    const attendee = await MeetingAttendee.findByIdAndDelete(req.params.id);

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json({ message: "Attendee removed from meeting successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
