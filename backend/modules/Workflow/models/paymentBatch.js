// models/PaymentBatch.js
import mongoose from 'mongoose';

const paymentBatchSchema = new mongoose.Schema({
  PBCode: { type: String, required: true },
  Status: { type: String, required: true },
  ChequeNo: { type: String, required: true },
  BankCode: { type: String, required: true },
}, { timestamps: true });

const PaymentBatch = mongoose.model('PaymentBatch', paymentBatchSchema);

// Export the model as the default export
export default PaymentBatch;
