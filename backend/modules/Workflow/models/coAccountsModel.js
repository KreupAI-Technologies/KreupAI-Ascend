// models/COAccounts.js
import mongoose from 'mongoose';

const coAccountSchema = new mongoose.Schema({
  Ledger: { type: String, required: true },
  Description: { type: String, required: true },
  AccountType: { type: String, required: true },
  ParentLedger: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'COAccount' 
  },
  Dimension1: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dimension' 
  },
  Dimension2: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dimension' 
  },
  Dimension3: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dimension' 
  },
  Dimension4: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dimension' 
  },
  Dimension5: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dimension' 
  },
  SubLevel: { type: Number },
  Notes: { type: String },
  Debit_Credit: { type: String }
});

const COAccount = mongoose.model('COAccount', coAccountSchema);
export default COAccount;
