// models/Product.js

import mongoose from 'mongoose';
import Account from './crmAccount.js'; 

const { Schema } = mongoose;

// Define the Product Schema
const productSchema = new Schema(
  {
    productCode: {
      type: String,
      required: [true, 'Product Code is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Product Code cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in productCode:', error);
            return false;
          }
        },
        message: 'Product Code cannot be empty.',
      },
    },
    productActive: {
      type: Boolean,
      default: true,
    },
    productCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: [true, 'Product Category ID is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in productCategoryId:', error);
              return false;
            }
          },
          message: 'Invalid Product Category ID',
        },
        {
          validator: async function (value) {
            try {
              const category = await mongoose.model('ProductCategory').findById(value);
              return !!category;
            } catch (error) {
              console.error('Validation error in productCategoryId async validator:', error);
              return false;
            }
          },
          message: (props) => `Product Category ID ${props.value} does not exist`,
        },
      ],
    },
    productName: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true,
      maxlength: [100, 'Product Name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in productName:', error);
            return false;
          }
        },
        message: 'Product Name cannot be empty.',
      },
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in vendorId:', error);
              return false;
            }
          },
          message: 'Invalid Vendor ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip validation if not provided
            try {
              const vendor = await Account.findOne({ _id: value, accountType: 'Vendors' });
              return !!vendor;
            } catch (error) {
              console.error('Validation error in vendorId async validator:', error);
              return false;
            }
          },
          message: 'Vendor not found or is not of type "Vendors"',
        },
      ],
    },
    manufacturerId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in manufacturerId:', error);
              return false;
            }
          },
          message: 'Invalid Manufacturer ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip validation if not provided
            try {
              const manufacturer = await Account.findOne({ _id: value, accountType: 'Vendors' });
              return !!manufacturer;
            } catch (error) {
              console.error('Validation error in manufacturerId async validator:', error);
              return false;
            }
          },
          message: 'Manufacturer not found or is not of type "Vendors"',
        },
      ],
    },
    salesStartDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !isNaN(Date.parse(v));
        },
        message: 'Invalid Sales Start Date',
      },
    },
    salesEndDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !isNaN(Date.parse(v));
        },
        message: 'Invalid Sales End Date',
      },
    },
    supportStartDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !isNaN(Date.parse(v));
        },
        message: 'Invalid Support Start Date',
      },
    },
    supportEndDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !isNaN(Date.parse(v));
        },
        message: 'Invalid Support End Date',
      },
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit Price is required'],
      min: [0, 'Unit Price cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in unitPrice:', error);
            return false;
          }
        },
        message: 'Unit Price cannot be negative.',
      },
    },
    tag: {
      type: String,
      trim: true,
      maxlength: [100, 'Tag cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 100;
          } catch (error) {
            console.error('Validation error in tag:', error);
            return false;
          }
        },
        message: 'Tag cannot exceed 100 characters.',
      },
    },
    usageUnit: {
      type: String,
      trim: true,
      maxlength: [50, 'Usage Unit cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 50;
          } catch (error) {
            console.error('Validation error in usageUnit:', error);
            return false;
          }
        },
        message: 'Usage Unit cannot exceed 50 characters.',
      },
    },
    box: {
      type: String,
      trim: true,
      maxlength: [50, 'Box cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 50;
          } catch (error) {
            console.error('Validation error in box:', error);
            return false;
          }
        },
        message: 'Box cannot exceed 50 characters.',
      },
    },
    quantityInStock: {
      type: Number,
      min: [0, 'Quantity In Stock cannot be negative'],
      default: 0,
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0;
          } catch (error) {
            console.error('Validation error in quantityInStock:', error);
            return false;
          }
        },
        message: 'Quantity In Stock must be a non-negative integer.',
      },
    },
    commissionRate: {
      type: Number,
      min: [0, 'Commission Rate cannot be negative'],
      max: [100, 'Commission Rate cannot exceed 100%'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0 && v <= 100;
          } catch (error) {
            console.error('Validation error in commissionRate:', error);
            return false;
          }
        },
        message: 'Commission Rate must be between 0 and 100.',
      },
    },
    quantityOrdered: {
      type: Number,
      min: [0, 'Quantity Ordered cannot be negative'],
      default: 0,
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0;
          } catch (error) {
            console.error('Validation error in quantityOrdered:', error);
            return false;
          }
        },
        message: 'Quantity Ordered must be a non-negative integer.',
      },
    },
    reorderLevel: {
      type: Number,
      min: [0, 'Reorder Level cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0;
          } catch (error) {
            console.error('Validation error in reorderLevel:', error);
            return false;
          }
        },
        message: 'Reorder Level must be a non-negative integer.',
      },
    },
    handlerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in handlerId:', error);
              return false;
            }
          },
          message: 'Invalid Handler ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip validation if not provided
            try {
              const user = await mongoose.model('User').findById(value);
              return !!user;
            } catch (error) {
              console.error('Validation error in handlerId async validator:', error);
              return false;
            }
          },
          message: (props) => `Handler ID ${props.value} does not exist`,
        },
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 1000;
          } catch (error) {
            console.error('Validation error in description:', error);
            return false;
          }
        },
        message: 'Description cannot exceed 1000 characters.',
      },
    },
    quantityInDemand: {
      type: Number,
      min: [0, 'Quantity In Demand cannot be negative'],
      default: 0,
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0;
          } catch (error) {
            console.error('Validation error in quantityInDemand:', error);
            return false;
          }
        },
        message: 'Quantity In Demand must be a non-negative integer.',
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
              const user = await mongoose.model('User').findById(value);
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
            if (!value) return true; // Skip validation if not provided
            try {
              const user = await mongoose.model('User').findById(value);
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

// Unique index on productCode
productSchema.index({ productCode: 1 }, { unique: true });

// Pre-save hook to validate vendor and manufacturer
productSchema.pre('save', async function (next) {
  const product = this;
  const Account = mongoose.model('Account');

  try {
    if (product.vendorId) {
      const vendor = await Account.findOne({
        _id: product.vendorId,
        accountType: 'Vendors', // Assuming 'accountType' field in Account model
      });
      if (!vendor) {
        return next(new Error('Vendor not found or is not of type "Vendors"'));
      }
    }

    if (product.manufacturerId) {
      const manufacturer = await Account.findOne({
        _id: product.manufacturerId,
        accountType: 'Vendors', // Assuming 'accountType' field in Account model
      });
      if (!manufacturer) {
        return next(new Error('Manufacturer not found or is not of type "Vendors"'));
      }
    }

    next();
  } catch (error) {
    console.error('Pre-save hook error in Product:', error);
    next(error);
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
