// Author : Bosco Sabu John
// Date : 16/09/2024
// Version : v2.0
// Description : Lead model for the Leads collection

import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (value) {
          // Validate that the user exists and has the role "Sales" or "Marketing"
          const UserRole = mongoose.model("UserRole"); // Assuming UserRole model exists
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
          return status && status.statusGroup === "LEAD STATUS";
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
          return status && status.statusGroup === "RATING";
        },
        message: 'Rating must belong to "Rating" group.',
      },
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
      validate: {
        validator: async function (value) {
          // Validate that the address belongs to the user
          const Address = mongoose.model("Address");
          const address = await Address.findById(value);
          return !!address;
        },
        message: (props) => `Address ID ${props.value} does not exist`,
      },
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
  },
  {
    timestamps: true,
  }
);

// Indexes
leadSchema.index({ email: 1 }, { unique: true });
leadSchema.index({ userId: 1 });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
