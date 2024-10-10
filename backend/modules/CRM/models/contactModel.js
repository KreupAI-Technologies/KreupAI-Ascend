// Author: Bosco Sabu John
// Date: 17/09/2024
// Version: v1.0
// Description: Contact model

import mongoose from "mongoose";

// Import the Lead schema fields
const leadFields = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (value) {
        // Validate that the user exists and has the role "Sales" or "Marketing"
        const UserRole = mongoose.model("UserRole");
        const roles = await UserRole.find({ userId: value }).populate(
          "roleId",
          "name"
        );
        const roleNames = roles.map((role) => role.roleId.name.toLowerCase());
        return roleNames.includes("sales") || roleNames.includes("marketing");
      },
      message: 'User must have the role "Sales" or "Marketing".',
    },
  },
  description: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
  },
  secondaryEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
  },
  emailOptOut: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  mobile: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  fax: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  industryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Industry",
    required: false,
  },
  leadSubSourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeadSubSource",
    required: false,
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: false,
    validate: {
      validator: async function (value) {
        // Validate that the status belongs to "Lead Status" group
        const Status = mongoose.model("Status");
        const status = await Status.findById(value);
        return status && status.statusGroup === "Lead Status";
      },
      message: 'Status must belong to "Lead Status" group.',
    },
  },
  ratingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: false,
    validate: {
      validator: async function (value) {
        // Validate that the status belongs to "Rating" group
        const Status = mongoose.model("Status");
        const status = await Status.findById(value);
        return status && status.statusGroup === "Rating";
      },
      message: 'Rating must belong to "Rating" group.',
    },
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: false,
  },
  website: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  twitter: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  annualRevenue: {
    type: Number,
    min: 0,
  },
  numberOfEmployees: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
};

// Additional fields for Contact
const contactFields = {
  dateOfBirth: {
    type: Date,
    required: false,
  },
  assistant: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  assistantPhone: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  contactName: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  reportingTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact", // Self-reference to another contact
    required: false,
    validate: {
      validator: function (value) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: "Invalid reportingTo Contact ID",
    },
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: false,
    validate: {
      validator: function (value) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: "Invalid Client ID",
    },
  },
};

// Merge leadFields and contactFields
const contactSchemaFields = { ...leadFields, ...contactFields };

// Define the Contact Schema
const contactSchema = new Schema(contactSchemaFields, {
  timestamps: true,
});

// Indexes
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ userId: 1 });

// Export the Contact model
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
