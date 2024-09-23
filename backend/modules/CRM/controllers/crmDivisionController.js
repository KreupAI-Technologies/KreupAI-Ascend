

import Division from '../models/crmDivision.js';
import asyncHandler from 'express-async-handler';


const createDivision = asyncHandler(async (req, res) => {
  const { code, name, description } = req.body;

  // Check if division with the same code already exists
  const existingDivision = await Division.findOne({ code });
  if (existingDivision) {
    res.status(400);
    throw new Error('Division with this code already exists.');
  }

  // Check if division with the same name already exists
  const existingDivisionName = await Division.findOne({ name });
  if (existingDivisionName) {
    res.status(400);
    throw new Error('Division with this name already exists.');
  }

  const division = new Division({
    code,
    name,
    description,
  });

  const createdDivision = await division.save();
  res.status(201).json(createdDivision);
});


const getDivisions = asyncHandler(async (req, res) => {
  const divisions = await Division.find();
  res.json(divisions);
});


const getDivisionById = asyncHandler(async (req, res) => {
  const division = await Division.findById(req.params.id);

  if (division) {
    res.json(division);
  } else {
    res.status(404);
    throw new Error('Division not found');
  }
});


const updateDivision = asyncHandler(async (req, res) => {
  const { code, name, description } = req.body;

  const division = await Division.findById(req.params.id);

  if (division) {
    // If updating code, ensure it's unique
    if (code && code !== division.code) {
      const existingDivision = await Division.findOne({ code });
      if (existingDivision) {
        res.status(400);
        throw new Error('Another Division with this code already exists.');
      }
      division.code = code;
    }

    // If updating name, ensure it's unique
    if (name && name !== division.name) {
      const existingDivisionName = await Division.findOne({ name });
      if (existingDivisionName) {
        res.status(400);
        throw new Error('Another Division with this name already exists.');
      }
      division.name = name;
    }

    division.description = description || division.description;

    const updatedDivision = await division.save();
    res.json(updatedDivision);
  } else {
    res.status(404);
    throw new Error('Division not found');
  }
});

const deleteDivision = asyncHandler(async (req, res) => {
  const division = await Division.findById(req.params.id);

  if (division) {
    await division.remove();
    res.json({ message: 'Division removed' });
  } else {
    res.status(404);
    throw new Error('Division not found');
  }
});

export {
  createDivision,
  getDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};
