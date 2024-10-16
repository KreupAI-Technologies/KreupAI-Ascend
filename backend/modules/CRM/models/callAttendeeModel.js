// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Model file for callAttendee

import mongoose from "mongoose";

// backend/models/callAttendee.model.js

const callAttendeeSchema = new mongoose.Schema(
  {
    callId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Call",
      required: [true, "Call ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Call ID",
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

// Index to prevent duplicate entries for the same user in a call
callAttendeeSchema.index({ callId: 1, userId: 1 }, { unique: true });

// Export the CallAttendee model
const CallAttendee = mongoose.model("CallAttendee", callAttendeeSchema);

export default CallAttendee;
