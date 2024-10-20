import PLGroup from "../models/PLGroup.js";

// Get all PLGroups
export const getPLGroups = async (req, res) => {
  try {
    const plGroups = await PLGroup.find();
    res.status(200).json(plGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new PLGroup
export const createPLGroup = async (req, res) => {
  const { PLCode, PLDescription } = req.body;
  const newPLGroup = new PLGroup({ PLCode, PLDescription });

  try {
    await newPLGroup.save();
    res.status(201).json(newPLGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a PLGroup
export const updatePLGroup = async (req, res) => {
  const { id } = req.params;
  const { PLCode, PLDescription } = req.body;

  try {
    const updatedPLGroup = await PLGroup.findByIdAndUpdate(
      id,
      { PLCode, PLDescription },
      { new: true }
    );
    if (!updatedPLGroup)
      return res.status(404).json({ message: "PLGroup not found" });

    res.status(200).json(updatedPLGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a PLGroup
export const deletePLGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPLGroup = await PLGroup.findByIdAndDelete(id);
    if (!deletedPLGroup)
      return res.status(404).json({ message: "PLGroup not found" });

    res.status(200).json({ message: "PLGroup deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
