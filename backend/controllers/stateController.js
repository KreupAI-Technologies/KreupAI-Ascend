import Country from "../models/countryModel.js";
import State from "../models/stateModel.js";
import mongoose from "mongoose";

// CREATE a new state
export const createState = async (req, res) => {
  try {
    const { code, name, countryId, description } = req.body;

    // Verify that the country exists
    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return res.status(400).json({ message: `Invalid country ID` });
    }

    const country = await Country.findById(countryId);
    if (!country) {
      return res
        .status(400)
        .json({ message: `Country ID ${countryId} does not exist` });
    }

    const state = new State({
      code,
      name,
      countryId,
      description,
    });

    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all states
export const getStates = async (req, res) => {
  try {
    const states = await State.find().populate("countryId", "name code");
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ states by country ID
export const getStatesByCountryId = async (req, res) => {
  try {
    const countryId = req.params.countryId;
    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return res.status(400).json({ message: `Invalid country ID` });
    }

    const states = await State.find({ countryId }).populate(
      "countryId",
      "name code"
    );
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a state by ID
export const getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json(state);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a state
export const updateState = async (req, res) => {
  try {
    const { code, name, countryId, description } = req.body;

    // Verify that the country exists if countryId is being updated
    if (countryId) {
      const country = await Country.findById(countryId);
      if (!country) {
        return res
          .status(400)
          .json({ message: `Country ID ${countryId} does not exist` });
      }
    }

    const state = await State.findByIdAndUpdate(
      req.params.id,
      { code, name, countryId, description },
      { new: true, runValidators: true }
    );

    if (!state) return res.status(404).json({ message: "State not found" });
    res.json(state);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a state
export const deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json({ message: "State deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH states by code or name
export const searchStates = async (req, res) => {
  try {
    const { code, name } = req.query;
    const query = {};

    if (code) {
      query.code = code.toUpperCase();
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const states = await State.find(query);
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
