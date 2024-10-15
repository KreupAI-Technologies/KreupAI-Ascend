// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Account model for the Accounts collection

// backend/models/account.model.js

import mongoose from "mongoose";

// Define the Account Schema
const accountSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: [true, "Client ID is required"],
      unique: true,
      trim: true,
      maxlength: [20, "Client ID cannot exceed 20 characters"],
    },
    clientName: {
      type: String,
      required: [true, "Client Name is required"],
      trim: true,
      maxlength: [100, "Client Name cannot exceed 100 characters"],
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Address ID",
      },
    },
    billingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Billing Address ID",
      },
    },
    shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Shipping Address ID",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid User ID",
      },
    },
    tradeLicense: {
      type: String,
      trim: true,
      maxlength: [50, "Trade License cannot exceed 50 characters"],
    },
    taxId: {
      type: String,
      trim: true,
      maxlength: [50, "Tax ID cannot exceed 50 characters"],
    },
    clientTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: false,
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Client Type ID",
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip if not provided
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "CLIENTS";
          },
          message: 'Client Type must belong to "Clients" status group',
        },
      ],
    },
    industryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Industry ID",
      },
    },
    website: {
      type: String,
      trim: true,
      maxlength: [200, "Website URL cannot exceed 200 characters"],
      match: [
        /^(https?:\/\/)?([\w\-]+\.)+([a-z]{2,})(\/[\w\-]*)*\/?$/,
        "Invalid website URL",
      ],
    },
    creditLimit: {
      type: Number,
      min: [0, "Credit Limit cannot be negative"],
    },
    creditDays: {
      type: Number,
      min: [0, "Credit Days cannot be negative"],
      max: [365, "Credit Days cannot exceed 365"],
    },
    paymentTermsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentTerm",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Payment Terms ID",
      },
    },
    deliveryTermsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryTerm",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Delivery Terms ID",
      },
    },
    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Payment Method ID",
      },
    },
    annualIncome: {
      type: Number,
      min: [0, "Annual Income cannot be negative"],
    },
    numberOfEmployeesRangeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: false,
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Number of Employees Range ID",
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip if not provided
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "EMPLOYEES RANGE";
          },
          message:
            'Number of Employees Range must belong to "Employees Range" status group',
        },
      ],
    },
    rating: {
      type: String,
      trim: true,
      maxlength: [10, "Rating cannot exceed 10 characters"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
      match: [/^\+?[0-9\-() ]{7,20}$/, "Invalid phone number"],
    },
    fax: {
      type: String,
      trim: true,
      maxlength: [20, "Fax number cannot exceed 20 characters"],
      match: [/^\+?[0-9\-() ]{7,20}$/, "Invalid fax number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
      maxlength: [100, "Email cannot exceed 100 characters"],
    },
    divisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Division",
      required: false,
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Division ID",
      },
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
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Last Modified By User ID",
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "lastModifiedDate",
    },
  }
);

// Indexes
accountSchema.index({ clientId: 1 }, { unique: true });
accountSchema.index({ clientName: 1 });

// Export the Account model
const Account = mongoose.model("Account", accountSchema);

export default Account;
