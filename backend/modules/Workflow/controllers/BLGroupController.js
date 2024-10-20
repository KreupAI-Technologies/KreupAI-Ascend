import BLGroup from "../models/BLGroup.js";

// Get all BLGroups
export const getBLGroups = async (req, res) => {
  try {
    const blGroups = await BLGroup.find();
    res.status(200).json(blGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new BLGroup
export const createBLGroup = async (req, res) => {
  const { BLCode, BLDescription } = req.body;
  const newBLGroup = new BLGroup({ BLCode, BLDescription });

  try {
    await newBLGroup.save();
    res.status(201).json(newBLGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a BLGroup
export const updateBLGroup = async (req, res) => {
  const { id } = req.params;
  const { BLCode, BLDescription } = req.body;

  try {
    const updatedBLGroup = await BLGroup.findByIdAndUpdate(
      id,
      { BLCode, BLDescription },
      { new: true }
    );
    if (!updatedBLGroup)
      return res.status(404).json({ message: "BLGroup not found" });

    res.status(200).json(updatedBLGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a BLGroup
export const deleteBLGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBLGroup = await BLGroup.findByIdAndDelete(id);
    if (!deletedBLGroup)
      return res.status(404).json({ message: "BLGroup not found" });

    res.status(200).json({ message: "BLGroup deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
