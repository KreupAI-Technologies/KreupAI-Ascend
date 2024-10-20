import { BankLedger } from "../models/bankLedger.model.js";

// Get all Bank Ledger records
export const getAllBankLedgers = async (req, res) => {
  try {
    const ledgers = await BankLedger.find();
    res.status(200).json(ledgers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new Bank Ledger entry
export const createBankLedger = async (req, res) => {
  const {
    bankCode,
    bpMethod,
    transactionType,
    bpStep,
    sequence,
    ledgerCode,
    dim1,
    dim2,
    dim3,
    dim4,
    dim5,
    debitCredit,
  } = req.body;
  const newLedger = new BankLedger({
    bankCode,
    bpMethod,
    transactionType,
    bpStep,
    sequence,
    ledgerCode,
    dim1,
    dim2,
    dim3,
    dim4,
    dim5,
    debitCredit,
  });

  try {
    await newLedger.save();
    res.status(201).json(newLedger);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing Bank Ledger entry
export const updateBankLedger = async (req, res) => {
  const { id } = req.params;
  const {
    bankCode,
    bpMethod,
    transactionType,
    bpStep,
    sequence,
    ledgerCode,
    dim1,
    dim2,
    dim3,
    dim4,
    dim5,
    debitCredit,
  } = req.body;

  try {
    const updatedLedger = await BankLedger.findByIdAndUpdate(
      id,
      {
        bankCode,
        bpMethod,
        transactionType,
        bpStep,
        sequence,
        ledgerCode,
        dim1,
        dim2,
        dim3,
        dim4,
        dim5,
        debitCredit,
      },
      { new: true }
    );
    if (!updatedLedger)
      return res.status(404).json({ message: "Bank Ledger not found" });
    res.status(200).json(updatedLedger);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Bank Ledger entry
export const deleteBankLedger = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLedger = await BankLedger.findByIdAndDelete(id);
    if (!deletedLedger)
      return res.status(404).json({ message: "Bank Ledger not found" });
    res.status(200).json({ message: "Bank Ledger deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
