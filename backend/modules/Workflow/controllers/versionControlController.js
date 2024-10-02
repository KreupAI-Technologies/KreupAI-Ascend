//Debayan
//21.9.24

import VersionControl from "../models/VersionControl.js";

// Get all version controls
export const getAllVersionControls = async (req, res) => {
  try {
    const versions = await VersionControl.find();
    res.json(versions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single version control by ID
export const getVersionControlById = async (req, res) => {
  try {
    const version = await VersionControl.findById(req.params.id);
    if (!version) return res.status(404).json({ message: "Version not found" });
    res.json(version);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new version control
export const createVersionControl = async (req, res) => {
  const version = new VersionControl(req.body);
  try {
    const newVersion = await version.save();
    res.status(201).json(newVersion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a version control
export const updateVersionControl = async (req, res) => {
  try {
    const updatedVersion = await VersionControl.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVersion)
      return res.status(404).json({ message: "Version not found" });
    res.json(updatedVersion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a version control
export const deleteVersionControl = async (req, res) => {
  try {
    const deletedVersion = await VersionControl.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVersion)
      return res.status(404).json({ message: "Version not found" });
    res.json({ message: "Version deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
