// models/Account.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Account Schema
const accountSchema = new Schema(
  {
    clientId: {
      type: String,
      required: [true, 'Client ID is required'],
      unique: true,
      trim: true,
      maxlength: [20, 'Client ID cannot exceed 20 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in clientId:', error);
            return false;
          }
        },
        message: 'Client ID cannot be empty.',
      },
    },
    clientName: {
      type: String,
      required: [true, 'Client Name is required'],
      trim: true,
      maxlength: [100, 'Client Name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in clientName:', error);
            return false;
          }
        },
        message: 'Client Name cannot be empty.',
      },
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in addressId:', error);
            return false;
          }
        },
        message: 'Invalid Address ID',
      },
    },
    billingAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in billingAddressId:', error);
            return false;
          }
        },
        message: 'Invalid Billing Address ID',
      },
    },
    shippingAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in shippingAddressId:', error);
            return false;
          }
        },
        message: 'Invalid Shipping Address ID',
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in userId:', error);
            return false;
          }
        },
        message: 'Invalid User ID',
      },
    },
    tradeLicense: {
      type: String,
      trim: true,
      maxlength: [50, 'Trade License cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 50;
          } catch (error) {
            console.error('Validation error in tradeLicense:', error);
            return false;
          }
        },
        message: 'Trade License cannot exceed 50 characters.',
      },
    },
    taxId: {
      type: String,
      trim: true,
      maxlength: [50, 'Tax ID cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 50;
          } catch (error) {
            console.error('Validation error in taxId:', error);
            return false;
          }
        },
        message: 'Tax ID cannot exceed 50 characters.',
      },
    },
    clientTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: false,
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in clientTypeId:', error);
              return false;
            }
          },
          message: 'Invalid Client Type ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip if not provided
            try {
              const Status = mongoose.model('Status');
              const status = await Status.findById(value);
              return status && status.statusGroup === 'Clients';
            } catch (error) {
              console.error('Validation error in clientTypeId async validator:', error);
              return false;
            }
          },
          message: 'Client Type must belong to "Clients" status group',
        },
      ],
    },
    industryId: {
      type: Schema.Types.ObjectId,
      ref: 'Industry',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in industryId:', error);
            return false;
          }
        },
        message: 'Invalid Industry ID',
      },
    },
    website: {
      type: String,
      trim: true,
      maxlength: [200, 'Website URL cannot exceed 200 characters'],
      match: [
        /^(https?:\/\/)?([\w\-]+)\.([a-z]{2,6}\.?)(\/[\w\-]*)*\/?$/,
        'Invalid website URL',
      ],
      validate: {
        validator: function (v) {
          try {
            return /^(https?:\/\/)?([\w\-]+)\.([a-z]{2,6}\.?)(\/[\w\-]*)*\/?$/.test(v);
          } catch (error) {
            console.error('Validation error in website:', error);
            return false;
          }
        },
        message: 'Invalid website URL.',
      },
    },
    creditLimit: {
      type: Number,
      min: [0, 'Credit Limit cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in creditLimit:', error);
            return false;
          }
        },
        message: 'Credit Limit cannot be negative.',
      },
    },
    creditDays: {
      type: Number,
      min: [0, 'Credit Days cannot be negative'],
      max: [365, 'Credit Days cannot exceed 365'],
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 0 && v <= 365;
          } catch (error) {
            console.error('Validation error in creditDays:', error);
            return false;
          }
        },
        message: 'Credit Days must be an integer between 0 and 365.',
      },
    },
    paymentTermsId: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentTerm',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in paymentTermsId:', error);
            return false;
          }
        },
        message: 'Invalid Payment Terms ID',
      },
    },
    deliveryTermsId: {
      type: Schema.Types.ObjectId,
      ref: 'DeliveryTerm',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in deliveryTermsId:', error);
            return false;
          }
        },
        message: 'Invalid Delivery Terms ID',
      },
    },
    paymentMethodId: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in paymentMethodId:', error);
            return false;
          }
        },
        message: 'Invalid Payment Method ID',
      },
    },
    annualIncome: {
      type: Number,
      min: [0, 'Annual Income cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in annualIncome:', error);
            return false;
          }
        },
        message: 'Annual Income cannot be negative.',
      },
    },
    numberOfEmployeesRangeId: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: false,
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in numberOfEmployeesRangeId:', error);
              return false;
            }
          },
          message: 'Invalid Number of Employees Range ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip if not provided
            try {
              const Status = mongoose.model('Status');
              const status = await Status.findById(value);
              return status && status.statusGroup === 'Employees Range';
            } catch (error) {
              console.error('Validation error in numberOfEmployeesRangeId async validator:', error);
              return false;
            }
          },
          message: 'Number of Employees Range must belong to "Employees Range" status group',
        },
      ],
    },
    rating: {
      type: String,
      trim: true,
      maxlength: [10, 'Rating cannot exceed 10 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 10;
          } catch (error) {
            console.error('Validation error in rating:', error);
            return false;
          }
        },
        message: 'Rating cannot exceed 10 characters.',
      },
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
      match: [/^\+?[0-9\-() ]{7,20}$/, 'Invalid phone number'],
      validate: {
        validator: function (v) {
          try {
            return /^\+?[0-9\-() ]{7,20}$/.test(v);
          } catch (error) {
            console.error('Validation error in phone:', error);
            return false;
          }
        },
        message: 'Invalid phone number.',
      },
    },
    fax: {
      type: String,
      trim: true,
      maxlength: [20, 'Fax number cannot exceed 20 characters'],
      match: [/^\+?[0-9\-() ]{7,20}$/, 'Invalid fax number'],
      validate: {
        validator: function (v) {
          try {
            return /^\+?[0-9\-() ]{7,20}$/.test(v);
          } catch (error) {
            console.error('Validation error in fax:', error);
            return false;
          }
        },
        message: 'Invalid fax number.',
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
      maxlength: [100, 'Email cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return /^\S+@\S+\.\S+$/.test(v);
          } catch (error) {
            console.error('Validation error in email:', error);
            return false;
          }
        },
        message: 'Invalid email address.',
      },
    },
    divisionId: {
      type: Schema.Types.ObjectId,
      ref: 'Division',
      required: false,
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in divisionId:', error);
            return false;
          }
        },
        message: 'Invalid Division ID',
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created By is required'],
      validate: {
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
    },
    lastModifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in lastModifiedBy:', error);
            return false;
          }
        },
        message: 'Invalid Last Modified By User ID',
      },
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
accountSchema.index({ clientId: 1 }, { unique: true });
accountSchema.index({ clientName: 1 });

const Account = mongoose.model('Account', accountSchema);

export default Account;
