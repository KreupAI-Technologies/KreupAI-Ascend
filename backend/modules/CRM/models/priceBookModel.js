// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Price Book model for the Price Books collection


import mongoose from "mongoose";


// backend/models/priceBook.model.js

const priceBookSchema = new mongoose.Schema(
    {
      priceBookId: {
        type: String,
        required: [true, "Price Book ID is required"],
        trim: true,
        unique: true,
        maxlength: [50, "Price Book ID cannot exceed 50 characters"],
      },
      priceBookName: {
        type: String,
        required: [true, "Price Book Name is required"],
        trim: true,
        maxlength: [100, "Price Book Name cannot exceed 100 characters"],
      },
      description: {
        type: String,
        trim: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Created By is required"],
        validate: {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Created By User ID",
        },
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Modified By User ID",
        },
      },
      modifiedAt: {
        type: Date,
      },
    }
  );
  
  // Unique index on priceBookId
  priceBookSchema.index({ priceBookId: 1 }, { unique: true });
  
const PriceBook = mongoose.model("PriceBook", priceBookSchema);

export default PriceBook;  