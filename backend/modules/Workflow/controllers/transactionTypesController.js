// controllers/transactionTypesController.js
import TransactionType from '../models/transactionTypesModel.js';

export const createTransactionType = async (req, res) => {
  const transactionType = new TransactionType({
    Type: req.body.Type,
    Description: req.body.Description,
    ControlAccount: req.body.ControlAccount
  });

  try {
    const newTransactionType = await transactionType.save();
    res.status(201).json(newTransactionType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTransactionTypes = async (req, res) => {
  try {
    const transactionTypes = await TransactionType.find().populate('ControlAccount');
    res.json(transactionTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

