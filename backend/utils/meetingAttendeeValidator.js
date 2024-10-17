import mongoose from "mongoose";
import { body } from "express-validator";
import MeetingAttendee from "../modules/CRM/models/meetingAttendeeModel.js";

export const validateCreateMeetingAttendee = [
  body("meetingId")
    .notEmpty()
    .withMessage("Meeting ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Meeting ID");
      }
      const Meeting = mongoose.model("Meeting");
      const meetingExists = await Meeting.exists({ _id: value });
      if (!meetingExists) {
        throw new Error("Meeting not found");
      }
      return true;
    }),
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid User ID");
      }
      const User = mongoose.model("User");
      const userExists = await User.exists({ _id: value });
      if (!userExists) {
        throw new Error("User not found");
      }
      return true;
    }),
  body("requirement").optional().trim(),
];

export const validateUpdateMeetingAttendee = [
  body("requirement").optional().trim(),
];
