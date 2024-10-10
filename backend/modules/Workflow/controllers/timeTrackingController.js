//Debayan
//21.9.24

import TimeTracking from "../models/timeTrackingModel.js";

// Create a new time tracking entry
export const createTimeTrackingEntry = async (req, res) => {
  const entry = new TimeTracking(req.body);
  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all time tracking entries
export const getAllTimeTrackingEntries = async (req, res) => {
  try {
    const entries = await TimeTracking.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single time tracking entry by ID
export const getTimeTrackingEntryById = async (req, res) => {
  try {
    const entry = await TimeTracking.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a time tracking entry
export const updateTimeTrackingEntry = async (req, res) => {
  try {
    const updatedEntry = await TimeTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEntry)
      return res.status(404).json({ message: "Entry not found" });
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a time tracking entry
export const deleteTimeTrackingEntry = async (req, res) => {
  try {
    const deletedEntry = await TimeTracking.findByIdAndDelete(req.params.id);
    if (!deletedEntry)
      return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
