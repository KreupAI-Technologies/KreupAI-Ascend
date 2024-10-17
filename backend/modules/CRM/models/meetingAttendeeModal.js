// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Model for the meetingAttendee collection

import mongoose from "mongoose";

// backend/models/meetingAttendee.model.js

const meetingAttendeeSchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: [true, "Meeting ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Meeting ID",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid User ID",
      },
    },
    requirement: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index to prevent duplicate entries for the same user in a meeting
meetingAttendeeSchema.index({ meetingId: 1, userId: 1 }, { unique: true });

// Export the MeetingAttendee model
const MeetingAttendee = mongoose.model(
  "MeetingAttendee",
  meetingAttendeeSchema
);
export default MeetingAttendee;
