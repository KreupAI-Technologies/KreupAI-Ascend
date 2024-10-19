// backend/models/salesOrder.model.js

// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Sales Order model for the Sales Orders collection

import mongoose from "mongoose";

const salesOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Order ID cannot exceed 50 characters"],
    },
    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: [true, "Quotation ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Quotation ID",
      },
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: [true, "Opportunity ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Opportunity ID",
      },
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Client ID is required"],
      // validate: [
      //   {
      //     validator: function (value) {
      //       return mongoose.Types.ObjectId.isValid(value);
      //     },
      //     message: "Invalid Client ID",
      //   },
      //   {
      //     validator: async function (value) {
      //       const Account = mongoose.model("Account");
      //       const client = await Account.findOne({
      //         _id: value,
      //         accountType: "Customers",
      //       });
      //       return !!client;
      //     },
      //     message: 'Client not found or is not of type "Customers"',
      //   },
      // ],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    orderName: {
      type: String,
      required: [true, "Order Name is required"],
      trim: true,
      maxlength: [100, "Order Name cannot exceed 100 characters"],
    },
    salesmanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Salesman ID is required"],
      // validate: [
      //   {
      //     validator: function (value) {
      //       return mongoose.Types.ObjectId.isValid(value);
      //     },
      //     message: "Invalid Salesman ID",
      //   },
      //   {
      //     validator: async function (value) {
      //       const User = mongoose.model("User");
      //       const user = await User.findOne({ _id: value, role: "Sales" });
      //       return !!user;
      //     },
      //     message: 'Salesman not found or does not have the role "Sales"',
      //   },
      // ],
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: [true, "Contact ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Contact ID",
      },
    },
    orderDescription: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
    paymentTerm: {
      type: String,
      trim: true,
    },
    deliveryTerm: {
      type: String,
      trim: true,
    },
    termsAndConditions: {
      type: String,
      trim: true,
    },
    totalValue: {
      type: Number,
      required: [true, "Total Value is required"],
      min: [0, "Total Value cannot be negative"],
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Status ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Status ID",
        },
        {
          validator: async function (value) {
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "ORDER STATUS";
          },
          message: 'Status must belong to "Order Status" status group',
        },
      ],
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
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Modified By User ID",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Unique index on orderId
salesOrderSchema.index({ orderId: 1 }, { unique: true });

// Pre-save hook to ensure consistency
salesOrderSchema.pre("save", async function (next) {
  const salesOrder = this;
  const Quotation = mongoose.model("Quotation");

  // Validate that the quotation exists
  const quotation = await Quotation.findById(salesOrder.quotationId);
  if (!quotation) {
    return next(new Error("Quotation not found"));
  }

  // Ensure that the opportunity and client match those in the quotation
  if (
    !salesOrder.opportunityId.equals(quotation.opportunityId) ||
    !salesOrder.clientId.equals(quotation.clientId)
  ) {
    return next(
      new Error(
        "Opportunity ID and Client ID must match those in the referenced quotation"
      )
    );
  }

  next();
});

const SalesOrder = mongoose.model("SalesOrder", salesOrderSchema);

export default SalesOrder;
