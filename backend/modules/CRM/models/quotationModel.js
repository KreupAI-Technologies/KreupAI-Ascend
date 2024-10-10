// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0
// Description : Quotation model for the Quotations collection

import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
    {
        quoteId: {
            type: String,
            required: [true, 'Quote ID is required'],
            trim: true,
            unique: true,
            maxlength: [50, 'Quote ID cannot exceed 50 characters'],
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: [true, 'Client ID is required'],
            validate: [
                {
                    validator: function (value) {
                        return mongoose.Types.ObjectId.isValid(value);
                    },
                    message: 'Invalid Client ID',
                },
                {
                    validator: async function (value) {
                        const Account = mongoose.model('Account');
                        const client = await Account.findOne({ _id: value, accountType: 'Customers' });
                        return !!client;
                    },
                    message: 'Client not found or is not of type "Customers"',
                },
            ],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        quoteVersion: {
            type: Number,
            required: [true, 'Quote Version is required'],
            min: [1, 'Quote Version must be at least 1'],
        },
        quoteName: {
            type: String,
            required: [true, 'Quote Name is required'],
            trim: true,
            maxlength: [100, 'Quote Name cannot exceed 100 characters'],
        },
        opportunityId: {
            type: Schema.Types.ObjectId,
            ref: 'Opportunity',
            required: [true, 'Opportunity ID is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
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
                        return mongoose.Types.ObjectId.isValid(value);
                    },
                    message: 'Invalid Salesman ID',
                },
                {
                    validator: async function (value) {
                        const User = mongoose.model('User');
                        const user = await User.findOne({ _id: value, role: 'Sales' });
                        return !!user;
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
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Contact ID',
            },
        },
        quoteDescription: {
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
            required: [true, 'Total Value is required'],
            min: [0, 'Total Value cannot be negative'],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Created By is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
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
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Modified By User ID',
            },
        },
        modifiedAt: {
            type: Date,
        },
    }
);

// Unique index on quoteId
quotationSchema.index({ quoteId: 1 }, { unique: true });

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;
