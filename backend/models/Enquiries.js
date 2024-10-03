import mongoose from 'mongoose';

const EnquiriesSchema = new mongoose.Schema({
  incident_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident_header',
    required: true,
  },
  comments: {
    type: String,
    required: true,
    trim: true,
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enquiries',
    default: null,
  },
  Enquiry_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'Enquiries'
});

export default mongoose.model('Enquiries', EnquiriesSchema);
