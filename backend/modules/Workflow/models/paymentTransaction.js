import mongoose from 'mongoose';
import TransactionTypes from '../models/TransactionTypes.js';
import Periods from '../models/Periods.js';
import BankAccounts from '../models/BankAccounts.js';
import BPMethods from '../models/BPMethods.js';
import Currencies from '../models/Currencies.js';
import Accounts from './Account.js'; // Assuming ClientCode refers to Accounts
import BPSteps from '../models/BPSteps.js';
import ChequeMaster from '../models/ChequeMaster.js';

const paymentTransactionSchema = new mongoose.Schema({
    TransactionType: { type: mongoose.Schema.Types.ObjectId, ref: 'TransactionTypes', required: true },
    DocumentNo: { type: String, required: true },
    DocumentDate: { type: Date, required: true },
    YearPeriod: { type: mongoose.Schema.Types.ObjectId, ref: 'Periods', required: true },
    Bankcode: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccounts', required: true },
    BPMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'BPMethods', required: true },
    Currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currencies', required: true },
    FCAmount: { type: Number, required: true },
    Rate: { type: Number, required: true },
    HCAmount: { type: Number, required: true },
    ClientCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    BPStep: { type: mongoose.Schema.Types.ObjectId, ref: 'BPSteps', required: true },
    ChequeNo: { type: mongoose.Schema.Types.ObjectId, ref: 'ChequeMaster', required: true }
}, {
    timestamps: true
});

const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);
export default PaymentTransaction;
