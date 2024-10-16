// Author: Bosco Sabu John
// Date : 17/09/2024
// Version: 1.0
// Description: This is the model for the meeting collection

import mongoose from "mongoose";

// backend/models/meeting.model.js

const meetingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    fromTime: {
      type: String,
      required: [true, "From Time is required"],
      validate: {
        validator: function (value) {
          // Validate time format HH:mm
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "From Time must be in HH:mm format",
      },
    },
    toTime: {
      type: String,
      required: [true, "To Time is required"],
      validate: {
        validator: function (value) {
          // Validate time format HH:mm
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "To Time must be in HH:mm format",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    collectionTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Collection Type is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Collection Type ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'Collections'
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "COLLECTIONS";
          },
          message: 'Collection Type must belong to "Collections" status group',
        },
      ],
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Collection ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Collection ID",
      },
    },
    meetingTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Meeting Type is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Meeting Type ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'Meeting'
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "MEETING";
          },
          message: 'Meeting Type must belong to "Meeting" status group',
        },
      ],
    },
    salesmanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Salesman ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Salesman ID",
      },
    },
    agenda: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created By is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Created By User ID",
      },
    },
  },
  { timestamps: true }
);

// Polymorphic reference validation
meetingSchema.pre("save", async function (next) {
  const meeting = this;
  const Status = mongoose.model("Status");
  const status = await Status.findById(meeting.collectionTypeId);
  if (!status || status.statusGroup !== "COLLECTIONS") {
    return next(
      new Error('Collection Type must belong to "Collections" status group')
    );
  }

  const collectionName = status.name; // Assuming the status 'name' field contains the collection name
  const Model = mongoose.model(collectionName);
  const exists = await Model.exists({ _id: meeting.collectionId });

  if (!exists) {
    return next(
      new Error(`Referenced document not found in ${collectionName} collection`)
    );
  }

  next();
});

// Export the Meeting model
const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
