// models/CallAttendee.js

import mongoose from 'mongoose';
// import Call from './crmCall.js'; // Import the Call model
// import User from './User.js'; // Import the User model

const { Schema } = mongoose;

// Define the CallAttendee Schema
const callAttendeeSchema = new Schema(
  {
    callId: {
      type: Schema.Types.ObjectId,
      ref: 'Call',
      required: [true, 'Call ID is required'],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: 'Invalid Call ID',
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: 'Invalid User ID',
      },
    },
    requirement: {
      type: String,
      trim: true,
      maxlength: [1000, 'Requirement cannot exceed 1000 characters'],
      validate: {
        validator: function (v) {
          return !v || v.length <= 1000;
        },
        message: 'Requirement cannot exceed 1000 characters.',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'lastModifiedDate',
    },
  }
);

// Index to prevent duplicate entries for the same user in a call
callAttendeeSchema.index({ callId: 1, userId: 1 }, { unique: true });

// Export the CallAttendee model
const CallAttendee = mongoose.model('CallAttendee', callAttendeeSchema);

export default CallAttendee;
