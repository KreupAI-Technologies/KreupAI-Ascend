// models/TransactionTypes.js
import mongoose from 'mongoose';

const transactionTypeSchema = new mongoose.Schema({
  Type: { type: String, required: true },
  Description: { type: String, required: true },
  ControlAccount: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'COAccount', 
    required: true 
  }
});

const TransactionType = mongoose.model('TransactionType', transactionTypeSchema);
export default TransactionType;
