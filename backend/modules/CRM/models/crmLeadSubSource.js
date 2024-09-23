// models/LeadSubSource.js

import mongoose from 'mongoose';
import LeadSource from './crmLeadSource.js'; // Import the LeadSource model

const { Schema } = mongoose;

const leadSubSourceSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'Lead Sub Source code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9_]{2,30}$/, 'Lead Sub Source code must consist of 2 to 30 uppercase letters, numbers, or underscores.'],
      validate: {
        validator: function (v) {
          try {
            return /^[A-Z0-9_]{2,30}$/.test(v);
          } catch (error) {
            console.error('Validation error in code:', error);
            return false;
          }
        },
        message: 'Lead Sub Source code must consist of 2 to 30 uppercase letters, numbers, or underscores.',
      },
    },
    name: {
      type: String,
      required: [true, 'Lead Sub Source name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Lead Sub Source name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Lead Sub Source name cannot be empty.',
      },
    },
    leadSourceId: {
      type: Schema.Types.ObjectId,
      ref: 'LeadSource',
      required: [true, 'Lead Source ID is required'],
      validate: {
        validator: async function (value) {
          try {
            const leadSource = await LeadSource.findById(value);
            return !!leadSource;
          } catch (error) {
            console.error('Validation error in leadSourceId:', error);
            return false;
          }
        },
        message: (props) => `Lead Source ID ${props.value} does not exist in LeadSources collection`,
      },
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: [255, 'Description cannot exceed 255 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 255;
          } catch (error) {
            console.error('Validation error in description:', error);
            return false;
          }
        },
        message: 'Description cannot exceed 255 characters.',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on code, name, and leadSourceId
leadSubSourceSchema.index({ code: 1 }, { unique: true });
leadSubSourceSchema.index({ name: 1 }, { unique: true });
leadSubSourceSchema.index({ leadSourceId: 1 });

const LeadSubSource = mongoose.model('LeadSubSource', leadSubSourceSchema);

export default LeadSubSource;
