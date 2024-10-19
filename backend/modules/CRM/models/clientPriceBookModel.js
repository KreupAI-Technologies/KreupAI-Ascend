// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Client Price Book model for the Client Price Books collection

import mongoose from "mongoose";

// backend/models/clientPriceBook.model.js

const clientPriceBookSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Client ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Client ID",
        },
        {
          validator: async function (value) {
            const Account = mongoose.model("Account");
            const client = await Account.findOne({ _id: value });
            return !!client;
          },
          message: "Client not found",
        },
      ],
    },
    priceBookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PriceBook",
      required: [true, "Price Book ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Price Book ID",
        },
        {
          validator: async function (value) {
            const PriceBook = mongoose.model("PriceBook");
            const priceBook = await PriceBook.findOne({ _id: value });
            return !!priceBook;
          },
          message: "Price Book not found",
        },
      ],
    },
    fromDate: {
      type: Date,
      default: Date.now,
      required: [true, "From Date is required"],
    },
    toDate: {
      type: Date,
      required: [true, "To Date is required"],
      // validate: {
      //   validator: function (value) {
      //     return value > this.fromDate;
      //   },
      //   message: "To Date must be after From Date",
      // },
    },
    isActive: {
      type: Boolean,
      default: true,
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

// Unique index to prevent duplicate active price books for the same client and price book
clientPriceBookSchema.index(
  { clientId: 1, priceBookId: 1, isActive: 1 },
  { unique: true, partialFilterExpression: { isActive: true } }
);

const ClientPriceBook = mongoose.model(
  "ClientPriceBook",
  clientPriceBookSchema
);

export default ClientPriceBook;
