// models/GeneralLedger.js
import mongoose from 'mongoose';

const generalLedgerSchema = new mongoose.Schema({
  type: { type: String, required: true },
  documentNumber: { type: String, required: true },
  date: { type: Date, required: true },
  fiscalYear: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  fiscalPeriod: { type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true },
  taxYear: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  taxPeriod: { type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true },
  ledger: { type: mongoose.Schema.Types.ObjectId, ref: 'COAccount', required: true },
  dim1: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', required: true },
  dim2: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension', required: true },
  dim3: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension' },
  dim4: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension' },
  dim5: { type: mongoose.Schema.Types.ObjectId, ref: 'Dimension' },
  narration: { type: String, required: true },
  currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required: true },
  currencyRate: { type: Number, required: true },
  fcAmount: { type: Number, required: true },
  localAmount: { type: Number, required: true },
  debitCredit: { type: String, required: true },
  balance: { type: Number, required: true },
  notes: { type: String },
  clientCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }
});

const GeneralLedger = mongoose.model('GeneralLedger', generalLedgerSchema);

export default GeneralLedger;
