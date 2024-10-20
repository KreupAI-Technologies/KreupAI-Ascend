import PLLedger from "../models/PLLedger.js";

// Get all PLLedgers
export const getPLLedgers = async (req, res) => {
  try {
    const plLedgers = await PLLedger.find().populate("PL_Code");
    res.status(200).json(plLedgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new PLLedger
export const createPLLedger = async (req, res) => {
  const ledgerData = req.body;

  try {
    const newPLLedger = new PLLedger(ledgerData);
    await newPLLedger.save();
    res.status(201).json(newPLLedger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a PLLedger
export const updatePLLedger = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPLLedger = await PLLedger.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedPLLedger)
      return res.status(404).json({ message: "PLLedger not found" });

    res.status(200).json(updatedPLLedger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a PLLedger
export const deletePLLedger = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPLLedger = await PLLedger.findByIdAndDelete(id);
    if (!deletedPLLedger)
      return res.status(404).json({ message: "PLLedger not found" });

    res.status(200).json({ message: "PLLedger deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
