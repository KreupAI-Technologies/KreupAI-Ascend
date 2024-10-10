import GLOpening from '../models/glOpeningModel.js';
import COAccount from '../models/coAccountsModel.js';
import Year from '../models/Year.js';

export const createGLOpening = async (req, res) => {
  const { ledger, year, HC_Amount_Debit, HC_Amount_Credit, HC_Amount_Balance } = req.body;

  try {
    // Check if the ledger (COAccount) and year exist
    const account = await COAccount.findById(ledger);
    const fiscalYear = await Year.findById(year);

    if (!account || !fiscalYear) {
      return res.status(404).json({ message: 'Account or Year not found' });
    }

    // Create the GLOpening
    const glOpening = new GLOpening({
      ledger,
      year,
      HC_Amount_Debit,
      HC_Amount_Credit,
      HC_Amount_Balance,
    });

    await glOpening.save();
    res.status(201).json(glOpening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all GLOpenings
export const getGLOpenings = async (req, res) => {
  try {
    const glOpenings = await GLOpening.find().populate('ledger year');
    res.status(200).json(glOpenings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single GLOpening by ID
export const getGLOpeningById = async (req, res) => {
  try {
    const glOpening = await GLOpening.findById(req.params.id).populate('ledger year');
    if (!glOpening) {
      return res.status(404).json({ message: 'GLOpening not found' });
    }
    res.status(200).json(glOpening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a GLOpening by ID
export const updateGLOpening = async (req, res) => {
  const { ledger, year, HC_Amount_Debit, HC_Amount_Credit, HC_Amount_Balance } = req.body;

  try {
    const updatedGLOpening = await GLOpening.findByIdAndUpdate(
      req.params.id,
      { ledger, year, HC_Amount_Debit, HC_Amount_Credit, HC_Amount_Balance },
      { new: true }
    ).populate('ledger year');

    if (!updatedGLOpening) {
      return res.status(404).json({ message: 'GLOpening not found' });
    }

    res.status(200).json(updatedGLOpening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a GLOpening by ID
export const deleteGLOpening = async (req, res) => {
  try {
    const glOpening = await GLOpening.findByIdAndDelete(req.params.id);
    if (!glOpening) {
      return res.status(404).json({ message: 'GLOpening not found' });
    }
    res.status(200).json({ message: 'GLOpening deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
