import LedgerSummary from '../models/LedgerSummary.js';

// Create a new Ledger Summary record
export const createLedgerSummary = async (req, res) => {
  try {
    const ledgerSummary = new LedgerSummary(req.body);
    const savedLedgerSummary = await ledgerSummary.save();
    res.status(201).json(savedLedgerSummary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Ledger Summaries with references populated
export const getLedgerSummaries = async (req, res) => {
    try {
      const ledgerSummaries = await LedgerSummary.find()
        .populate('ledger') // Populates COAccount
        .populate('year_period') // Populates Periods
        .populate('currency'); // Populates Currencies
  
      res.status(200).json(ledgerSummaries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single Ledger Summary by ID with references populated
  export const getLedgerSummaryById = async (req, res) => {
    try {
      const ledgerSummary = await LedgerSummary.findById(req.params.id)
        .populate('ledger') // Populates COAccount
        .populate('year_period') // Populates Periods
        .populate('currency'); // Populates Currencies
  
      if (!ledgerSummary) {
        return res.status(404).json({ message: 'Ledger Summary not found' });
      }
      res.status(200).json(ledgerSummary);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Update Ledger Summary
export const updateLedgerSummary = async (req, res) => {
  try {
    const updatedLedgerSummary = await LedgerSummary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLedgerSummary) {
      return res.status(404).json({ message: 'Ledger Summary not found' });
    }
    res.status(200).json(updatedLedgerSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Ledger Summary
export const deleteLedgerSummary = async (req, res) => {
  try {
    const deletedLedgerSummary = await LedgerSummary.findByIdAndDelete(req.params.id);
    if (!deletedLedgerSummary) {
      return res.status(404).json({ message: 'Ledger Summary not found' });
    }
    res.status(200).json({ message: 'Ledger Summary deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};