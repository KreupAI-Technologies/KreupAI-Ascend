// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0
import Country from '../models/crmAddress.js';
import asyncHandler from 'express-async-handler';

const createCountry = asyncHandler(async (req, res) => {
  try {
    const { code, name, currency, description } = req.body;

    // Check if country with the same code already exists
    const existingCountry = await Country.findOne({ code });
    if (existingCountry) {
      res.status(400);
      throw new Error('Country with this code already exists.');
    }

    const country = new Country({
      code,
      name,
      currency,
      description,
    });

    const createdCountry = await country.save();
    res.status(201).json(createdCountry);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || 'Invalid country data.');
  }
});


const getCountries = asyncHandler(async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
});


const getCountryById = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (country) {
    res.json(country);
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});


const updateCountry = asyncHandler(async (req, res) => {
  try {
    const { code, name, currency, description } = req.body;

    const country = await Country.findById(req.params.id);

    if (country) {
      // If updating code, ensure it's unique
      if (code && code !== country.code) {
        const existingCountry = await Country.findOne({ code });
        if (existingCountry) {
          res.status(400);
          throw new Error('Another country with this code already exists.');
        }
        country.code = code;
      }

      country.name = name || country.name;
      country.currency = currency || country.currency;
      country.description = description || country.description;

      const updatedCountry = await country.save();
      res.json(updatedCountry);
    } else {
      res.status(404);
      throw new Error('Country not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message || 'Invalid country data.');
  }
});


const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (country) {
    await country.remove();
    res.json({ message: 'Country removed' });
  } else {
    res.status(404);
    throw new Error('Country not found');
  }
});

export {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};
