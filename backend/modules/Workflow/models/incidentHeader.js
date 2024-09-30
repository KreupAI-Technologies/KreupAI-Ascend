// models/IncidentHeader.js

import mongoose from 'mongoose';
// import Account from './Account.js'; // Assuming the Account model exists
import User2 from './User2.js';       // Assuming the User model exists
// import Status from './Status.js';   // Assuming the Status model exists

const { Schema } = mongoose;

// Define the IncidentHeader Schema
const IncidentHeaderSchema = new Schema(
  {
    incident_process: {
      type: String,
      required: [true, 'Incident Process is required'],
      trim: true,
      maxlength: [100, 'Incident Process cannot exceed 100 characters'],
    },
    version: {
      type: String,
      required: [true, 'Version is required'],
      trim: true,
      maxlength: [50, 'Version cannot exceed 50 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Client ID is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Client ID.',
        },
        {
          validator: async function (value) {
            const clientExists = await Account.exists({ _id: value });
            return !!clientExists;
          },
          message: 'Client not found.',
        },
      ],
    },
    requester: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Requester is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Requester User ID.',
        },
        {
          validator: async function (value) {
            const userExists = await User2.exists({ _id: value });
            return !!userExists;
          },
          message: 'Requester user not found.',
        },
      ],
    },
    creation_date: {
      type: Date,
      default: Date.now,
    },
    creation_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creation User is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Creation User ID.',
        },
        {
          validator: async function (value) {
            const userExists = await User2.exists({ _id: value });
            return !!userExists;
          },
          message: 'Creation user not found.',
        },
      ],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    from_date: {
      type: Date,
      required: [true, 'From Date is required'],
    },
    to_date: {
      type: Date,
      required: [true, 'To Date is required'],
      validate: {
        validator: function (value) {
          return value >= this.from_date;
        },
        message: 'To Date must be greater than or equal to From Date.',
      },
    },
    division: {
      type: String,
      required: [true, 'Division is required'],
      trim: true,
      maxlength: [100, 'Division cannot exceed 100 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    collection: {
      type: String,
      required: [true, 'Collection is required'],
      trim: true,
      maxlength: [100, 'Collection cannot exceed 100 characters'],
    },
    priority: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: [true, 'Priority is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Priority Status ID.',
        },
        {
          validator: async function (value) {
            const statusExists = await Status.exists({ _id: value, status_group: 'priority' });
            return !!statusExists;
          },
          message: 'Priority must refer to a status with status_group = "priority".',
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'modifiedAt',
    },
  }
);

// Export the IncidentHeader model
const IncidentHeader = mongoose.model('IncidentHeader', IncidentHeaderSchema);

export default IncidentHeader;
