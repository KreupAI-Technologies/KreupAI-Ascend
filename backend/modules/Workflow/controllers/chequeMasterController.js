// /controllers/chequeMasterController.js
import ChequeMaster from '../models/chequemasterModel.js';

// Fetch all ChequeMaster records
export const getChequeMasters = async (req, res) => {
  try {
    const cheques = await ChequeMaster.find().populate('BPMethod'); // Populate BPMethod details
    res.json(cheques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new ChequeMaster record
export const createChequeMaster = async (req, res) => {
  const { bankCode, BPMethod, chequeNo, status } = req.body;

  const cheque = new ChequeMaster({
    bankCode,
    BPMethod,
    chequeNo,
    status,
  });

  try {
    const newCheque = await cheque.save();
    res.status(201).json(newCheque);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
