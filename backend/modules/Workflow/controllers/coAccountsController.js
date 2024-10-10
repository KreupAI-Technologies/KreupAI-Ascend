// controllers/coAccountsController.js
import COAccount from '../models/coAccountsModel.js';

// Function to handle the creation of a new COAccount
export const createCOAccount = async (req, res) => {
  const coAccount = new COAccount({
    Ledger: req.body.Ledger,
    Description: req.body.Description,
    AccountType: req.body.AccountType,
    ParentLedger: req.body.ParentLedger,
    Dimension1: req.body.Dimension1,
    Dimension2: req.body.Dimension2,
    Dimension3: req.body.Dimension3,
    Dimension4: req.body.Dimension4,
    Dimension5: req.body.Dimension5,
    SubLevel: req.body.SubLevel,
    Notes: req.body.Notes,
    Debit_Credit: req.body.Debit_Credit
  });

  try {
    const newCOAccount = await coAccount.save();
    res.status(201).json(newCOAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
