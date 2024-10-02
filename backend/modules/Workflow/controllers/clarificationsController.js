import Clarifications from "../models/Clarifications.js";

// Create a new Clarification
export const createClarification = async (req, res) => {
  try {
    const clarification = new Clarifications(req.body);
    await clarification.save();
    res.status(201).json(clarification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get all Clarifications (optionally by incident_id)
export const getClarifications = async (req, res) => {
  try {
    const filter = {};
    if (req.query.incident_id) {
      filter.incident_id = req.query.incident_id;
    }
    const clarifications = await Clarifications.find(filter)
      .populate("incident_id")
      .populate("user_id")
      .populate("parent_id");
    res.status(200).json(clarifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single Clarification by ID
export const getClarificationById = async (req, res) => {
  try {
    const clarification = await Clarifications.findById(req.params.id)
      .populate("incident_id")
      .populate("user_id")
      .populate("parent_id");
    if (!clarification) {
      return res.status(404).json({ error: "Clarification not found" });
    }
    res.status(200).json(clarification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a Clarification
export const updateClarification = async (req, res) => {
  try {
    const clarification = await Clarifications.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!clarification) {
      return res.status(404).json({ error: "Clarification not found" });
    }
    res.status(200).json(clarification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete a Clarification
export const deleteClarification = async (req, res) => {
  try {
    const clarification = await Clarifications.findByIdAndDelete(req.params.id);
    if (!clarification) {
      return res.status(404).json({ error: "Clarification not found" });
    }
    res.status(200).json({ message: "Clarification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
