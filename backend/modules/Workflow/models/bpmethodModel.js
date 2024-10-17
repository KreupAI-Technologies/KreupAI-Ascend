// /models/BPMethod.js
import mongoose from 'mongoose';

const bpMethodSchema = new mongoose.Schema({
  BPMethod: { type: String, unique: true, required: true },
  description: { type: String, required: true },  // Required field
  paymentReceipt: { type: String, required: true } // Required field
});

const BPMethod = mongoose.model('BPMethod', bpMethodSchema);

export default BPMethod;
