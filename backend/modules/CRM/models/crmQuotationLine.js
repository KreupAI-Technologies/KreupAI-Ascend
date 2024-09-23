// models/QuotationLine.js

import mongoose from 'mongoose';
import Quotation from './crmQuotation.js'; // Import the Quotation model
// import Product from './Product.js'; // Import the Product model
// import User from './User.js'; // Import the User model

const { Schema } = mongoose;

const quotationLineSchema = new Schema(
  {
    quotationId: {
      type: Schema.Types.ObjectId,
      ref: 'Quotation',
      required: [true, 'Quotation ID is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in quotationId:', error);
              return false;
            }
          },
          message: 'Invalid Quotation ID',
        },
        {
          validator: async function (value) {
            try {
              const quotation = await Quotation.findById(value);
              return !!quotation;
            } catch (error) {
              console.error('Validation error in quotationId async validator:', error);
              return false;
            }
          },
          message: (props) => `Quotation ID ${props.value} does not exist`,
        },
      ],
    },
    serialNo: {
      type: Number,
      required: [true, 'Serial Number is required'],
      min: [1, 'Serial Number must be at least 1'],
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 1;
          } catch (error) {
            console.error('Validation error in serialNo:', error);
            return false;
          }
        },
        message: 'Serial Number must be an integer of at least 1.',
      },
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in productId:', error);
              return false;
            }
          },
          message: 'Invalid Product ID',
        },
        {
          validator: async function (value) {
            try {
              const product = await Product.findById(value);
              return !!product;
            } catch (error) {
              console.error('Validation error in productId async validator:', error);
              return false;
            }
          },
          message: (props) => `Product ID ${props.value} does not exist`,
        },
      ],
    },
    itemDescription: {
      type: String,
      required: [true, 'Item Description is required'],
      trim: true,
      maxlength: [500, 'Item Description cannot exceed 500 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in itemDescription:', error);
            return false;
          }
        },
        message: 'Item Description cannot be empty.',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0;
          } catch (error) {
            console.error('Validation error in quantity:', error);
            return false;
          }
        },
        message: 'Quantity must be a non-negative integer.',
      },
    },
    rate: {
      type: Number,
      required: [true, 'Rate is required'],
      min: [0, 'Rate cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in rate:', error);
            return false;
          }
        },
        message: 'Rate cannot be negative.',
      },
    },
    value: {
      type: Number,
      required: [true, 'Value is required'],
      min: [0, 'Value cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in value:', error);
            return false;
          }
        },
        message: 'Value cannot be negative.',
      },
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in discount:', error);
            return false;
          }
        },
        message: 'Discount cannot be negative.',
      },
    },
    netValue: {
      type: Number,
      required: [true, 'Net Value is required'],
      min: [0, 'Net Value cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in netValue:', error);
            return false;
          }
        },
        message: 'Net Value cannot be negative.',
      },
    },
    taxPercentage: {
      type: Number,
      required: [true, 'Tax Percentage is required'],
      min: [0, 'Tax Percentage cannot be negative'],
      max: [100, 'Tax Percentage cannot exceed 100%'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0 && v <= 100;
          } catch (error) {
            console.error('Validation error in taxPercentage:', error);
            return false;
          }
        },
        message: 'Tax Percentage must be between 0 and 100.',
      },
    },
    taxAmount: {
      type: Number,
      required: [true, 'Tax Amount is required'],
      min: [0, 'Tax Amount cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in taxAmount:', error);
            return false;
          }
        },
        message: 'Tax Amount cannot be negative.',
      },
    },
    netAmount: {
      type: Number,
      required: [true, 'Net Amount is required'],
      min: [0, 'Net Amount cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in netAmount:', error);
            return false;
          }
        },
        message: 'Net Amount cannot be negative.',
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created By is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in createdBy:', error);
              return false;
            }
          },
          message: 'Invalid Created By User ID',
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
          message: (props) => `Created By User ID ${props.value} does not exist`,
        },
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in modifiedBy:', error);
              return false;
            }
          },
          message: 'Invalid Modified By User ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip if not provided
            try {
              const user = await User.findById(value);
              return !!user;
            } catch (error) {
              console.error('Validation error in modifiedBy async validator:', error);
              return false;
            }
          },
          message: (props) => `Modified By User ID ${props.value} does not exist`,
        },
      ],
    },
    modifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'lastModifiedDate',
    },
  }
);

// Index to ensure unique serial numbers within the same quotation
quotationLineSchema.index({ quotationId: 1, serialNo: 1 }, { unique: true });

// Pre-save hook to ensure serial numbers are sequential within a quotation
quotationLineSchema.pre('save', async function (next) {
  const QuotationLine = mongoose.model('QuotationLine');
  const count = await QuotationLine.countDocuments({ quotationId: this.quotationId });
  if (this.serialNo > count + 1) {
    return next(new Error('Serial Number must be sequential within the quotation'));
  }
  next();
});

const QuotationLine = mongoose.model('QuotationLine', quotationLineSchema);

export default QuotationLine;
