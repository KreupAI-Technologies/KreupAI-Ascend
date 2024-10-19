// backend/models/productPriceBook.model.js
// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Product Price Book model for the Product Price Books collection

import mongoose from "mongoose";

const productPriceBookSchema = new mongoose.Schema(
  {
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
            const priceBookExists = await PriceBook.exists({ _id: value });
            return !!priceBookExists;
          },
          message: "Price Book not found",
        },
      ],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Product ID",
        },
        {
          validator: async function (value) {
            const Product = mongoose.model("Product");
            const productExists = await Product.exists({ _id: value });
            return !!productExists;
          },
          message: "Product not found",
        },
      ],
    },
    serialNo: {
      type: Number,
      required: [true, "Serial Number is required"],
      min: [1, "Serial Number must be at least 1"],
    },
    fromDate: {
      type: Date,
      required: [true, "From Date is required"],
    },
    toDate: {
      type: Date,
      required: [true, "To Date is required"],
    //   validate: {
    //     validator: function (value) {
    //       return value > this.fromDate;
    //     },
    //     message: "To Date must be after From Date",
    //   },
    },
    fromQty: {
      type: Number,
      default: 0,
      min: [0, "From Quantity cannot be negative"],
    },
    toQty: {
      type: Number,
      required: [true, "To Quantity is required"],
      min: [0, "To Quantity cannot be negative"],
    //   validate: {
    //     validator: function (value) {
    //       return value >= this.fromQty;
    //     },
    //     message: "To Quantity must be greater than or equal to From Quantity",
    //   },
    },
    standardPrice: {
      type: Number,
      required: [true, "Standard Price is required"],
      min: [0, "Standard Price cannot be negative"],
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount Percentage cannot be negative"],
      max: [100, "Discount Percentage cannot exceed 100%"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    netPrice: {
      type: Number,
      required: [true, "Net Price is required"],
      min: [0, "Net Price cannot be negative"],
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
  { timestamps: true }
);

// Index to ensure unique serial numbers within the same product and price book
productPriceBookSchema.index(
  { priceBookId: 1, productId: 1, serialNo: 1 },
  { unique: true }
);

// Pre-save hook to handle serial number reset for new product ID
productPriceBookSchema.pre("save", async function (next) {
  const ProductPriceBook = mongoose.model("ProductPriceBook");

  // If serialNo is not provided, set it to the next available number
  if (!this.serialNo) {
    const lastEntry = await ProductPriceBook.findOne({
      priceBookId: this.priceBookId,
      productId: this.productId,
    })
      .sort({ serialNo: -1 })
      .exec();
    this.serialNo = lastEntry ? lastEntry.serialNo + 1 : 1;
  } else {
    // Check if serialNo is sequential
    const count = await ProductPriceBook.countDocuments({
      priceBookId: this.priceBookId,
      productId: this.productId,
    });
    if (this.serialNo > count + 1) {
      return next(
        new Error(
          "Serial Number must be sequential within the same product and price book"
        )
      );
    }
  }

  next();
});

// Pre-save hook to calculate discount and net price
productPriceBookSchema.pre("save", function (next) {
  const standardPrice = this.standardPrice;
  const discountPercentage = this.discountPercentage || 0;
  const discount = this.discount || 0;

  // Calculate discount based on percentage if not provided
  let calculatedDiscount = discount;
  if (!discount && discountPercentage > 0) {
    calculatedDiscount = (standardPrice * discountPercentage) / 100;
    this.discount = calculatedDiscount;
  }

  // Calculate net price
  this.netPrice = standardPrice - calculatedDiscount;

  next();
});

const ProductPriceBook = mongoose.model(
  "ProductPriceBook",
  productPriceBookSchema
);

export default ProductPriceBook;
