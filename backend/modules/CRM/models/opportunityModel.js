// backend/models/opportunity.model.js

import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid User ID',
            },
        },
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: [true, 'Account ID is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Account ID',
            },
        },
        contactId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
            required: [true, 'Contact ID is required'],
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Contact ID',
            },
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount cannot be negative'],
        },
        website: {
            type: String,
            trim: true,
            maxlength: [200, 'Website cannot exceed 200 characters'],
            match: [
                /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,6}(\/[\w\-]*)*\/?$/,
                'Invalid Website URL',
            ],
        },
        dealName: {
            type: String,
            required: [true, 'Deal Name is required'],
            trim: true,
            maxlength: [100, 'Deal Name cannot exceed 100 characters'],
        },
        typeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            required: [true, 'Type is required'],
            validate: {
                validator: async function (value) {
                    const Status = mongoose.model('Status');
                    const status = await Status.findById(value);
                    return status && status.statusGroup === 'OPPORTUNITY TYPE';
                },
                message: 'Type must belong to "Opportunity Type" status group',
            },
        },
        nextStep: {
            type: String,
            trim: true,
            maxlength: [255, 'Next Step cannot exceed 255 characters'],
        },
        closingDate: {
            type: Date,
            required: [true, 'Closing Date is required'],
        },
        leadSourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LeadSource',
            required: false,
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid Lead Source ID',
            },
        },
        stageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            required: [true, 'Stage is required'],
            validate: {
                validator: async function (value) {
                    const Status = mongoose.model('Status');
                    const status = await Status.findById(value);
                    return status && status.statusGroup === 'OPPORTUNITY STAGE';
                },
                message: 'Stage must belong to "Opportunity Stage" status group',
            },
        },
        expectedRevenue: {
            type: Number,
            min: [0, 'Expected Revenue cannot be negative'],
        },
        description: {
            type: String,
            trim: true,
        },
        probabilityPercentage: {
            type: Number,
            min: [0, 'Probability cannot be negative'],
            max: [100, 'Probability cannot exceed 100%'],
        },
        probability: {
            type: Number,
            min: [0, 'Probability cannot be negative'],
            max: [1, 'Probability cannot exceed 1'],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
opportunitySchema.index({ dealName: 1, accountId: 1 }, { unique: true });

// Export the Opportunity model
const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;