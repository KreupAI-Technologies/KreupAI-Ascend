import { validationResult } from "express-validator";
import Meeting from "../models/meetingModel.js";

export const createMeeting = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const meetingData = req.body;
    meetingData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

    // Create a new Meeting instance
    const meeting = new Meeting(meetingData);
    await meeting.save();

    // Populate references for the response
    await meeting
      .populate("collectionTypeId", "name")
      .populate("meetingTypeId", "name")
      .populate("salesmanId", "firstName lastName username")
      .populate("createdBy", "firstName lastName username")
      .execPopulate();

    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("collectionTypeId", "name")
      .populate("meetingTypeId", "name")
      .populate("salesmanId", "firstName lastName username")
      .populate("createdBy", "firstName lastName username");
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate("collectionTypeId", "name")
      .populate("meetingTypeId", "name")
      .populate("salesmanId", "firstName lastName username")
      .populate("createdBy", "firstName lastName username");
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMeeting = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;

    const meeting = await Meeting.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("collectionTypeId", "name")
      .populate("meetingTypeId", "name")
      .populate("salesmanId", "firstName lastName username")
      .populate("createdBy", "firstName lastName username");

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(meeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
