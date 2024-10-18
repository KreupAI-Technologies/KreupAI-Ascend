import PaymentTransaction from '../models/paymentTransaction.js';
import TransactionTypes from '../models/TransactionTypes.js';
import Periods from '../models/Periods.js';
import BankAccounts from '../models/BankAccounts.js';
import BPMethods from '../models/BPMethods.js';
import Currencies from '../models/Currencies.js';
import Accounts from '../models/Account.js'; // Assuming ClientCode refers to Accounts
import BPSteps from '../models/BPSteps.js';
import ChequeMaster from '../models/ChequeMaster.js';

// Create new PaymentTransaction
export const createPaymentTransaction = async (req, res) => {
    try {
        const newTransaction = new PaymentTransaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all PaymentTransactions
export const getAllPaymentTransactions = async (req, res) => {
    try {
        const transactions = await PaymentTransaction.find()
            .populate('TransactionType YearPeriod Bankcode BPMethod Currency ClientCode BPStep ChequeNo');
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get PaymentTransaction by ID
export const getPaymentTransactionById = async (req, res) => {
    try {
        const transaction = await PaymentTransaction.findById(req.params.id)
            .populate('TransactionType YearPeriod Bankcode BPMethod Currency ClientCode BPStep ChequeNo');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update PaymentTransaction
export const updatePaymentTransaction = async (req, res) => {
    try {
        const updatedTransaction = await PaymentTransaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete PaymentTransaction
export const deletePaymentTransaction = async (req, res) => {
    try {
        const deletedTransaction = await PaymentTransaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
