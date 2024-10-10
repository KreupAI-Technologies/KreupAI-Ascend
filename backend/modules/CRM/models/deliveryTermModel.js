// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.0
// Description : Delivery Term model for the Delivery Terms collection


import mongoose from "mongoose";

// backend/models/deliveryTerm.model.js

const deliveryTermSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Delivery Term name is required'],
            trim: true,
            unique: true,
            maxlength: [100, 'Delivery Term name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [255, 'Description cannot exceed 255 characters'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
deliveryTermSchema.index({ name: 1 }, { unique: true });

// Export the DeliveryTerm model
const DeliveryTerm = mongoose.model('DeliveryTerm', deliveryTermSchema);

export default DeliveryTerm;
