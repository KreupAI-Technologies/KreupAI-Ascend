// models/Quotation.js

import mongoose from 'mongoose';
import Account from './crmAccount.js'; // Import the Account model
// import User from './User.js'; // Import the User model
// import Opportunity from './Opportunity.js'; // Import the Opportunity model
// import Contact from './Contact.js'; // Import the Contact model

const { Schema } = mongoose;

// Define the Quotation Schema
const quotationSchema = new Schema(
  {
    quoteId: {
      type: String,
      required: [true, 'Quote ID is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Quote ID cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in quoteId:', error);
            return false;
          }
        },
        message: 'Quote ID cannot be empty.',
      },
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Client ID is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in clientId:', error);
              return false;
            }
          },
          message: 'Invalid Client ID',
        },
        {
          validator: async function (value) {
            try {
              const client = await Account.findOne({ _id: value, accountType: 'Customers' });
              return !!client;
            } catch (error) {
              console.error('Validation error in clientId async validator:', error);
              return false;
            }
          },
          message: 'Client not found or is not of type "Customers"',
        },
      ],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: function (v) {
          try {
            return !isNaN(Date.parse(v));
          } catch (error) {
            console.error('Validation error in date:', error);
            return false;
          }
        },
        message: 'Invalid date format.',
      },
    },
    quoteVersion: {
      type: Number,
      required: [true, 'Quote Version is required'],
      min: [1, 'Quote Version must be at least 1'],
      validate: {
        validator: function (v) {
          try {
            return Number.isInteger(v) && v >= 1;
          } catch (error) {
            console.error('Validation error in quoteVersion:', error);
            return false;
          }
        },
        message: 'Quote Version must be an integer of at least 1.',
      },
    },
    quoteName: {
      type: String,
      required: [true, 'Quote Name is required'],
      trim: true,
      maxlength: [100, 'Quote Name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in quoteName:', error);
            return false;
          }
        },
        message: 'Quote Name cannot be empty.',
      },
    },
    opportunityId: {
      type: Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: [true, 'Opportunity ID is required'],
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in opportunityId:', error);
            return false;
          }
        },
        message: 'Invalid Opportunity ID',
      },
    },
    salesmanId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Salesman ID is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in salesmanId:', error);
              return false;
            }
          },
          message: 'Invalid Salesman ID',
        },
        {
          validator: async function (value) {
            try {
              const user = await User.findOne({ _id: value, role: 'Sales' });
              return !!user;
            } catch (error) {
              console.error('Validation error in salesmanId async validator:', error);
              return false;
            }
          },
          message: 'Salesman not found or does not have the role "Sales"',
        },
      ],
    },
    contactId: {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
      required: [true, 'Contact ID is required'],
      validate: {
        validator: function (value) {
          try {
            return mongoose.Types.ObjectId.isValid(value);
          } catch (error) {
            console.error('Validation error in contactId:', error);
            return false;
          }
        },
        message: 'Invalid Contact ID',
      },
    },
    quoteDescription: {
      type: String,
      trim: true,
      maxlength: [500, 'Quote Description cannot exceed 500 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 500;
          } catch (error) {
            console.error('Validation error in quoteDescription:', error);
            return false;
          }
        },
        message: 'Quote Description cannot exceed 500 characters.',
      },
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [500, 'Remarks cannot exceed 500 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 500;
          } catch (error) {
            console.error('Validation error in remarks:', error);
            return false;
          }
        },
        message: 'Remarks cannot exceed 500 characters.',
      },
    },
    paymentTerm: {
      type: String,
      trim: true,
      maxlength: [100, 'Payment Term cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 100;
          } catch (error) {
            console.error('Validation error in paymentTerm:', error);
            return false;
          }
        },
        message: 'Payment Term cannot exceed 100 characters.',
      },
    },
    deliveryTerm: {
      type: String,
      trim: true,
      maxlength: [100, 'Delivery Term cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 100;
          } catch (error) {
            console.error('Validation error in deliveryTerm:', error);
            return false;
          }
        },
        message: 'Delivery Term cannot exceed 100 characters.',
      },
    },
    termsAndConditions: {
      type: String,
      trim: true,
      maxlength: [1000, 'Terms and Conditions cannot exceed 1000 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 1000;
          } catch (error) {
            console.error('Validation error in termsAndConditions:', error);
            return false;
          }
        },
        message: 'Terms and Conditions cannot exceed 1000 characters.',
      },
    },
    totalValue: {
      type: Number,
      required: [true, 'Total Value is required'],
      min: [0, 'Total Value cannot be negative'],
      validate: {
        validator: function (v) {
          try {
            return v >= 0;
          } catch (error) {
            console.error('Validation error in totalValue:', error);
            return false;
          }
        },
        message: 'Total Value cannot be negative.',
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
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

// Unique index on quoteId
quotationSchema.index({ quoteId: 1 }, { unique: true });

const Quotation = mongoose.model('Quotation', quotationSchema);

export default Quotation;
