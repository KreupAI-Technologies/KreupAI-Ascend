// models/Call.js

import mongoose from 'mongoose';
import Status from './crmStatus.js'; // Import the Status model
// import User from './User.js'; // Import the User model

const { Schema } = mongoose;

// Define the Call Schema
const callSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: function (v) {
          return !isNaN(Date.parse(v));
        },
        message: 'Invalid date format.',
      },
    },
    fromTime: {
      type: String,
      required: [true, 'From Time is required'],
      validate: {
        validator: function (value) {
          // Validate time format HH:mm
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: 'From Time must be in HH:mm format.',
      },
    },
    toTime: {
      type: String,
      required: [true, 'To Time is required'],
      validate: {
        validator: function (value) {
          // Validate time format HH:mm
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: 'To Time must be in HH:mm format.',
      },
    },
    callInformation: {
      type: String,
      trim: true,
      maxlength: [1000, 'Call Information cannot exceed 1000 characters'],
      validate: {
        validator: function (v) {
          return !v || v.length <= 1000;
        },
        message: 'Call Information cannot exceed 1000 characters.',
      },
    },
    collectionTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: [true, 'Collection Type is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Collection Type ID.',
        },
        {
          validator: async function (value) {
            try {
              const status = await Status.findById(value);
              return status && status.statusGroup === 'Collections';
            } catch (error) {
              console.error('Validation error in collectionTypeId async validator:', error);
              return false;
            }
          },
          message: 'Collection Type must belong to "Collections" status group.',
        },
      ],
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Collection ID is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Collection ID.',
        },
        {
          validator: async function (value) {
            try {
              // Fetch the associated Status to determine the collection name
              const status = await Status.findById(this.collectionTypeId);
              if (!status) return false;

              const collectionName = status.name; // Ensure that status.name matches the model name
              const Model = mongoose.model(collectionName);
              const exists = await Model.exists({ _id: value });
              return !!exists;
            } catch (error) {
              console.error('Validation error in collectionId async validator:', error);
              return false;
            }
          },
          message: (props) => `Referenced document not found in the ${props.value} collection.`,
        },
      ],
    },
    callTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: [true, 'Call Type is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Call Type ID.',
        },
        {
          validator: async function (value) {
            try {
              const status = await Status.findById(value);
              return status && status.statusGroup === 'Meetings';
            } catch (error) {
              console.error('Validation error in callTypeId async validator:', error);
              return false;
            }
          },
          message: 'Call Type must belong to "Meetings" status group.',
        },
      ],
    },
    salesmanId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Salesman ID is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Salesman ID.',
        },
        {
          validator: async function (value) {
            try {
              const user = await User.findById(value);
              return !!user;
            } catch (error) {
              console.error('Validation error in salesmanId async validator:', error);
              return false;
            }
          },
          message: (props) => `Salesman ID ${props.value} does not exist.`,
        },
      ],
    },
    callAgenda: {
      type: String,
      trim: true,
      maxlength: [1000, 'Call Agenda cannot exceed 1000 characters'],
      validate: {
        validator: function (v) {
          return !v || v.length <= 1000;
        },
        message: 'Call Agenda cannot exceed 1000 characters.',
      },
    },
    callDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Call Description cannot exceed 2000 characters'],
      validate: {
        validator: function (v) {
          return !v || v.length <= 2000;
        },
        message: 'Call Description cannot exceed 2000 characters.',
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created By is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Created By User ID.',
        },
        {
          validator: async function (value) {
            try {
              const user = await User.findById(value);
              return !!user;
            } catch (error) {
              console.error('Validation error in createdBy async validator:', error);
              return false;
            }
          },
          message: (props) => `Created By User ID ${props.value} does not exist.`,
        },
      ],
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

// Indexes
callSchema.index({ date: 1, salesmanId: 1 });

// Pre-save hook to ensure 'toTime' is after 'fromTime'
callSchema.pre('save', function (next) {
  const from = this.fromTime.split(':').map(Number);
  const to = this.toTime.split(':').map(Number);
  const fromDate = new Date(this.date);
  fromDate.setHours(from[0], from[1], 0, 0);
  const toDate = new Date(this.date);
  toDate.setHours(to[0], to[1], 0, 0);

  if (toDate <= fromDate) {
    return next(new Error('To Time must be after From Time.'));
  }

  next();
});

// Export the Call model
const Call = mongoose.model('Call', callSchema);

export default Call;
