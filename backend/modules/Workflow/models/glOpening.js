// models/glOpening.js
import mongoose from 'mongoose';
import COAccount from './COAccount.js';
import Year from './Year.js';

const glOpeningSchema = new mongoose.Schema({
  ledger: { 
    type: mongoose.Schema.Types.ObjectId
    ,  // Use String to reference COAccount using a string identifier (e.g., accountCode)
    ref: 'COAccount',  // Reference the COAccount model, but with a string value
    required: true 
  },
  year: { 
    type: mongoose.Schema.Types.ObjectId
    ,  // Use String to reference Year using a string identifier (e.g., yearCode)
    ref: 'Year',  // Reference the Year model, but with a string value
    required: true 
  },
  HC_Amount_Debit: { type: Number, required: true },
  HC_Amount_Credit: { type: Number, required: true },
  HC_Amount_Balance: { type: Number, required: true },
});

export default mongoose.model('GLOpening', glOpeningSchema);