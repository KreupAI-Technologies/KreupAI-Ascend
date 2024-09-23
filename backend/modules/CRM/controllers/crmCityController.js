// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import City from '../models/crmCity.js';
import asyncHandler from 'express-async-handler';


const createCity = asyncHandler(async (req, res) => {
  const { code, name, stateId, description } = req.body;

  // Check if city with the same code already exists
  const existingCity = await City.findOne({ code });
  if (existingCity) {
    res.status(400);
    throw new Error('City with this code already exists.');
  }

  const city = new City({
    code,
    name,
    stateId,
    description,
  });

  const createdCity = await city.save();
  res.status(201).json(createdCity);
});

const getCities = asyncHandler(async (req, res) => {
  const cities = await City.find()
    .populate('stateId', 'name code'); // Populate state details as needed

  res.json(cities);
});

const getCityById = asyncHandler(async (req, res) => {
  const city = await City.findById(req.params.id)
    .populate('stateId', 'name code');

  if (city) {
    res.json(city);
  } else {
    res.status(404);
    throw new Error('City not found');
  }
});
const updateCity = asyncHandler(async (req, res) => {
  const { code, name, stateId, description } = req.body;

  const city = await City.findById(req.params.id);

  if (city) {
    // If updating code, ensure it's unique
    if (code && code !== city.code) {
      const existingCity = await City.findOne({ code });
      if (existingCity) {
        res.status(400);
        throw new Error('Another city with this code already exists.');
      }
      city.code = code;
    }

    city.name = name || city.name;
    city.stateId = stateId || city.stateId;
    city.description = description || city.description;

    const updatedCity = await city.save();
    res.json(updatedCity);
  } else {
    res.status(404);
    throw new Error('City not found');
  }
});


const deleteCity = asyncHandler(async (req, res) => {
  const city = await City.findById(req.params.id);

  if (city) {
    await city.remove();
    res.json({ message: 'City removed' });
  } else {
    res.status(404);
    throw new Error('City not found');
  }
});

export {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};
