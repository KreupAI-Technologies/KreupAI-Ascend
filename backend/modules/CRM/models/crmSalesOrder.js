// models/SalesOrder.js

import mongoose from 'mongoose';
import Quotation from './crmQuotation.js'; // Import the Quotation model
// import Opportunity from './Opportunity.js'; // Import the Opportunity model
import Account from './crmAccount.js'; // Import the Account model
// import User from './User.js'; // Import the User model
// import Contact from './Contact.js'; // Import the Contact model
import Status from './crmStatus.js'; // Import the Status model

const { Schema } = mongoose;

// Define the SalesOrder Schema
const salesOrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: [true, 'Order ID is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Order ID cannot exceed 50 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in orderId:', error);
            return false;
          }
        },
        message: 'Order ID cannot be empty.',
      },
    },
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
    opportunityId: {
      type: Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: [true, 'Opportunity ID is required'],
      validate: [
        {
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
        {
          validator: async function (value) {
            try {
              const opportunity = await Opportunity.findById(value);
              return !!opportunity;
            } catch (error) {
              console.error('Validation error in opportunityId async validator:', error);
              return false;
            }
          },
          message: (props) => `Opportunity ID ${props.value} does not exist`,
        },
      ],
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
    orderName: {
      type: String,
      required: [true, 'Order Name is required'],
      trim: true,
      maxlength: [100, 'Order Name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in orderName:', error);
            return false;
          }
        },
        message: 'Order Name cannot be empty.',
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
      validate: [
        {
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
        {
          validator: async function (value) {
            try {
              const contact = await Contact.findById(value);
              return !!contact;
            } catch (error) {
              console.error('Validation error in contactId async validator:', error);
              return false;
            }
          },
          message: (props) => `Contact ID ${props.value} does not exist`,
        },
      ],
    },
    orderDescription: {
      type: String,
      trim: true,
      maxlength: [500, 'Order Description cannot exceed 500 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 500;
          } catch (error) {
            console.error('Validation error in orderDescription:', error);
            return false;
          }
        },
        message: 'Order Description cannot exceed 500 characters.',
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
    statusId: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: [true, 'Status ID is required'],
      validate: [
        {
          validator: function (value) {
            try {
              return mongoose.Types.ObjectId.isValid(value);
            } catch (error) {
              console.error('Validation error in statusId:', error);
              return false;
            }
          },
          message: 'Invalid Status ID',
        },
        {
          validator: async function (value) {
            try {
              const status = await Status.findById(value);
              return status && status.statusGroup === 'Order Status';
            } catch (error) {
              console.error('Validation error in statusId async validator:', error);
              return false;
            }
          },
          message: 'Status must belong to "Order Status" status group',
        },
      ],
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

// Unique index on orderId
salesOrderSchema.index({ orderId: 1 }, { unique: true });

// Pre-save hook to ensure consistency
salesOrderSchema.pre('save', async function (next) {
  const salesOrder = this;
  
  try {
    // Validate that the quotation exists
    const quotation = await Quotation.findById(salesOrder.quotationId);
    if (!quotation) {
      return next(new Error('Quotation not found'));
    }

    // Ensure that the opportunity and client match those in the quotation
    if (
      !salesOrder.opportunityId.equals(quotation.opportunityId) ||
      !salesOrder.clientId.equals(quotation.clientId)
    ) {
      return next(
        new Error(
          'Opportunity ID and Client ID must match those in the referenced quotation'
        )
      );
    }
    
    next();
  } catch (error) {
    console.error('Pre-save hook error in SalesOrder:', error);
    next(error);
  }
});

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

export default SalesOrder;
