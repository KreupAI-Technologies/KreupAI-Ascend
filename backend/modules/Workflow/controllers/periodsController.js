// controllers/periodsController.js
import Periods from "../models/periodsModel.js";

// Create a new period
export const createPeriod = async (req, res) => {
  const period = new Periods({
    Month: req.body.Month,
    Description: req.body.Description,
  });

  try {
    const newPeriod = await period.save();
    res.status(201).json(newPeriod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all periods
export const getPeriods = async (req, res) => {
  try {
    const periods = await Periods.find();
    res.json(periods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific period by ID
export const getPeriodById = async (req, res) => {
  try {
    const period = await Periods.findById(req.params.id);
    if (period == null) {
      return res.status(404).json({ message: "Period not found" });
    }
    res.json(period);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a period
export const updatePeriod = async (req, res) => {
  try {
    const period = await Periods.findById(req.params.id);
    if (period == null) {
      return res.status(404).json({ message: "Period not found" });
    }

    if (req.body.Month != null) {
      period.Month = req.body.Month;
    }
    if (req.body.Description != null) {
      period.Description = req.body.Description;
    }

    const updatedPeriod = await period.save();
    res.json(updatedPeriod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a period
export const deletePeriod = async (req, res) => {
  try {
    const period = await Periods.findById(req.params.id);
    if (period == null) {
      return res.status(404).json({ message: "Period not found" });
    }

    await period.remove();
    res.json({ message: "Period deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};