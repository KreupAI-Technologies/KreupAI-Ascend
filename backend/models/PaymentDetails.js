// models/PaymentDetails.js
import mongoose from 'mongoose';

const PaymentDetailsSchema = new mongoose.Schema({
  TransactionType: { type: String, required: true },
  Documentno: { type: String, required: true },
  BPMethod: { type: String, required: true },
  BankCode: { type: String, required: true },
  DocumentDate: { type: Date, required: true },
  YearPeriod: { type: String, required: true },
  Client: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }, // Refers to accounts
  ReferenceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ACRDetails', required: true }, // Refers to ACR Details
  ReferenceDocumentNo: { type: mongoose.Schema.Types.ObjectId, ref: 'ACRDetails', required: true }, // Refers to ACR Details
  FCAmount: { type: Number, required: true },
  Currency: { type: String, required: true },
  Rate: { type: Number, required: true },
  HCAmount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('PaymentDetails', PaymentDetailsSchema);
