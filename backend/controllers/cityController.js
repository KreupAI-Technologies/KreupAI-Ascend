import City from "../models/cityModel.js";
import State from "../models/stateModel.js";
import mongoose from "mongoose";

// CREATE a new city
export const createCity = async (req, res) => {
  try {
    const { code, name, stateId, description } = req.body;

    // Verify that the state exists
    if (!mongoose.Types.ObjectId.isValid(stateId)) {
      return res.status(400).json({ message: `Invalid state ID` });
    }

    const state = await State.findById(stateId);
    if (!state) {
      return res
        .status(400)
        .json({ message: `State ID ${stateId} does not exist` });
    }

    const city = new City({
      code,
      name,
      stateId,
      description,
    });

    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all cities
export const getCities = async (req, res) => {
  try {
    const cities = await City.find().populate("stateId", "name code");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ cities by state ID
export const getCitiesByStateId = async (req, res) => {
  try {
    const stateId = req.params.stateId;
    if (!mongoose.Types.ObjectId.isValid(stateId)) {
      return res.status(400).json({ message: `Invalid state ID` });
    }

    const cities = await City.find({ stateId }).populate(
      "stateId",
      "name code"
    );
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a city by ID
export const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate(
      "stateId",
      "name code"
    );
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a city
export const updateCity = async (req, res) => {
  try {
    const { code, name, stateId, description } = req.body;

    // Verify that the state exists if stateId is being updated
    if (stateId) {
      if (!mongoose.Types.ObjectId.isValid(stateId)) {
        return res.status(400).json({ message: `Invalid state ID` });
      }
      const state = await State.findById(stateId);
      if (!state) {
        return res
          .status(400)
          .json({ message: `State ID ${stateId} does not exist` });
      }
    }

    const city = await City.findByIdAndUpdate(
      req.params.id,
      { code, name, stateId, description },
      { new: true, runValidators: true }
    ).populate("stateId", "name code");

    if (!city) return res.status(404).json({ message: "City not found" });
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a city
export const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json({ message: "City deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH cities by name
export const searchCities = async (req, res) => {
  try {
    const name = req.params.name;
    const cities = await City.find({
      name: { $regex: name, $options: "i" },
    }).populate("stateId", "name code");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
