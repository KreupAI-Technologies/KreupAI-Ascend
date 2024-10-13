// controllers/generalLedgerController.js
import GeneralLedger from '../models/generalLedgerModel.js';

// Create a new ledger entry
export const createEntry = async (req, res) => {
  const {
    type, documentNumber, date, fiscalYear, fiscalPeriod, taxYear, taxPeriod, ledger, dim1, dim2, dim3, dim4, dim5, narration, currency, currencyRate, fcAmount, localAmount, debitCredit, balance, notes, clientCode
  } = req.body;

  try {
    const newEntry = new GeneralLedger({
      type, documentNumber, date, fiscalYear, fiscalPeriod, taxYear, taxPeriod, ledger, dim1, dim2, dim3, dim4, dim5, narration, currency, currencyRate, fcAmount, localAmount, debitCredit, balance, notes, clientCode
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all ledger entries
export const getAllEntries = async (req, res) => {
  try {
    const entries = await GeneralLedger.find().populate('fiscalYear fiscalPeriod taxYear taxPeriod ledger dim1 dim2 dim3 dim4 dim5 currency clientCode');
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single ledger entry by ID
export const getEntryById = async (req, res) => {
  try {
    const entry = await GeneralLedger.findById(req.params.id).populate('fiscalYear fiscalPeriod taxYear taxPeriod ledger dim1 dim2 dim3 dim4 dim5 currency clientCode');
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a ledger entry
export const updateEntry = async (req, res) => {
  try {
    const updatedEntry = await GeneralLedger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a ledger entry
export const deleteEntry = async (req, res) => {
  try {
    const entry = await GeneralLedger.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    
    await entry.remove();
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
