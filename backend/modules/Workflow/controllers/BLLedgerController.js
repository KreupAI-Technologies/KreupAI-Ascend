import BLLedger from "../models/BLLedger.js";

// Get all BLLedgers
export const getBLLedgers = async (req, res) => {
  try {
    const blLedgers = await BLLedger.find().populate("BL_Code");
    res.status(200).json(blLedgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new BLLedger
export const createBLLedger = async (req, res) => {
  const ledgerData = req.body;

  try {
    const newBLLedger = new BLLedger(ledgerData);
    await newBLLedger.save();
    res.status(201).json(newBLLedger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a BLLedger
export const updateBLLedger = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedBLLedger = await BLLedger.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBLLedger)
      return res.status(404).json({ message: "BLLedger not found" });

    res.status(200).json(updatedBLLedger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a BLLedger
export const deleteBLLedger = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBLLedger = await BLLedger.findByIdAndDelete(id);
    if (!deletedBLLedger)
      return res.status(404).json({ message: "BLLedger not found" });

    res.status(200).json({ message: "BLLedger deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
