// controllers/industryController.js

import Industry from '../models/crmIndustry.js';
import asyncHandler from 'express-async-handler';

const createIndustry = asyncHandler(async (req, res) => {
  const { code, name, description } = req.body;

  // Check if industry with the same code already exists
  const existingIndustry = await Industry.findOne({ code });
  if (existingIndustry) {
    res.status(400);
    throw new Error('Industry with this code already exists.');
  }

  const industry = new Industry({
    code,
    name,
    description,
  });

  const createdIndustry = await industry.save();
  res.status(201).json(createdIndustry);
});


const getIndustries = asyncHandler(async (req, res) => {
  const industries = await Industry.find();
  res.json(industries);
});

const getIndustryById = asyncHandler(async (req, res) => {
  const industry = await Industry.findById(req.params.id);

  if (industry) {
    res.json(industry);
  } else {
    res.status(404);
    throw new Error('Industry not found');
  }
});


const updateIndustry = asyncHandler(async (req, res) => {
  const { code, name, description } = req.body;

  const industry = await Industry.findById(req.params.id);

  if (industry) {
    // If updating code, ensure it's unique
    if (code && code !== industry.code) {
      const existingIndustry = await Industry.findOne({ code });
      if (existingIndustry) {
        res.status(400);
        throw new Error('Another industry with this code already exists.');
      }
      industry.code = code;
    }

    industry.name = name || industry.name;
    industry.description = description || industry.description;

    const updatedIndustry = await industry.save();
    res.json(updatedIndustry);
  } else {
    res.status(404);
    throw new Error('Industry not found');
  }
});

const deleteIndustry = asyncHandler(async (req, res) => {
  const industry = await Industry.findById(req.params.id);

  if (industry) {
    await industry.remove();
    res.json({ message: 'Industry removed' });
  } else {
    res.status(404);
    throw new Error('Industry not found');
  }
});

export {
  createIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
};
