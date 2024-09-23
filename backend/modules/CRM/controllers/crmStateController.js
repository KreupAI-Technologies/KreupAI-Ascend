// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import State from '../models/crmState.js';
import asyncHandler from 'express-async-handler';


const createState = asyncHandler(async (req, res) => {
  const { code, name, country, description } = req.body;

  // Check if state with the same code already exists
  const existingState = await State.findOne({ code });
  if (existingState) {
    res.status(400);
    throw new Error('State with this code already exists.');
  }

  const state = new State({
    code,
    name,
    country,
    description,
  });

  const createdState = await state.save();
  res.status(201).json(createdState);
});

const getStates = asyncHandler(async (req, res) => {
  const states = await State.find()
    .populate('country', 'name code'); // Populate country details as needed

  res.json(states);
});

const getStateById = asyncHandler(async (req, res) => {
  const state = await State.findById(req.params.id)
    .populate('country', 'name code');

  if (state) {
    res.json(state);
  } else {
    res.status(404);
    throw new Error('State not found');
  }
});

const updateState = asyncHandler(async (req, res) => {
  const { code, name, country, description } = req.body;

  const state = await State.findById(req.params.id);

  if (state) {
    // If updating code, ensure it's unique
    if (code && code !== state.code) {
      const existingState = await State.findOne({ code });
      if (existingState) {
        res.status(400);
        throw new Error('Another state with this code already exists.');
      }
      state.code = code;
    }

    state.name = name || state.name;
    state.country = country || state.country;
    state.description = description || state.description;

    const updatedState = await state.save();
    res.json(updatedState);
  } else {
    res.status(404);
    throw new Error('State not found');
  }
});


const deleteState = asyncHandler(async (req, res) => {
  const state = await State.findById(req.params.id);

  if (state) {
    await state.remove();
    res.json({ message: 'State removed' });
  } else {
    res.status(404);
    throw new Error('State not found');
  }
});

export {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
};
