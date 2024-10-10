import Dimension from "../models/dimensionModel.js";

// Create new dimension
export const createDimension = async (req, res) => {
  try {
    const newDimension = new Dimension(req.body);
    await newDimension.save();
    res.status(201).json(newDimension);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all dimensions
export const getDimensions = async (req, res) => {
  try {
    const dimensions = await Dimension.find().populate("parentDim");
    res.status(200).json(dimensions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single dimension by ID
export const getDimensionById = async (req, res) => {
  try {
    const dimension = await Dimension.findById(req.params.id).populate(
      "parentDim"
    );
    if (!dimension)
      return res.status(404).json({ message: "Dimension not found" });
    res.status(200).json(dimension);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update dimension by ID
export const updateDimension = async (req, res) => {
  try {
    const dimension = await Dimension.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!dimension)
      return res.status(404).json({ message: "Dimension not found" });
    res.status(200).json(dimension);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete dimension by ID
export const deleteDimension = async (req, res) => {
  try {
    const dimension = await Dimension.findByIdAndDelete(req.params.id);
    if (!dimension)
      return res.status(404).json({ message: "Dimension not found" });
    res.status(200).json({ message: "Dimension deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
