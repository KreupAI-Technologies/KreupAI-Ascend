import { BPStep } from "../models/bpStep.model.js";

// Get all BP Steps
export const getAllBPSteps = async (req, res) => {
  try {
    const steps = await BPStep.find();
    res.status(200).json(steps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new BP Step
export const createBPStep = async (req, res) => {
  const { step, description } = req.body;
  const newStep = new BPStep({ step, description });

  try {
    await newStep.save();
    res.status(201).json(newStep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing BP Step
export const updateBPStep = async (req, res) => {
  const { id } = req.params;
  const { step, description } = req.body;

  try {
    const updatedStep = await BPStep.findByIdAndUpdate(
      id,
      { step, description },
      { new: true } // returns the updated document
    );
    if (!updatedStep)
      return res.status(404).json({ message: "BP Step not found" });
    res.status(200).json(updatedStep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a BP Step
export const deleteBPStep = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStep = await BPStep.findByIdAndDelete(id);
    if (!deletedStep)
      return res.status(404).json({ message: "BP Step not found" });
    res.status(200).json({ message: "BP Step deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
