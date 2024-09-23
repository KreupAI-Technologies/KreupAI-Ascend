// controllers/leadSourceController.js

import LeadSource from '../models/crmLeadSource.js';
import asyncHandler from 'express-async-handler';


const createLeadSource = asyncHandler(async (req, res) => {
  const { code, name, description } = req.body;

  // Check if lead source with the same code already exists
  const existingLeadSource = await LeadSource.findOne({ code });
  if (existingLeadSource) {
    res.status(400);
    throw new Error('Lead Source with this code already exists.');
  }

  // Check if lead source with the same name already exists
  const existingLeadSourceName = await LeadSource.findOne({ name });
  if (existingLeadSourceName) {
    res.status(400);
    throw new Error('Lead Source with this name already exists.');
  }

  const leadSource = new LeadSource({
    code,
    name,
    description,
  });

  const createdLeadSource = await leadSource.save();
  res.status(201).json(createdLeadSource);
});

const getLeadSources = asyncHandler(async (req, res) => {
  const leadSources = await LeadSource.find();
  res.json(leadSources);
});

const getLeadSourceById = asyncHandler(async (req, res) => {
  const leadSource = await LeadSource.findById(req.params.id);

  if (leadSource) {
    res.json(leadSource);
  } else {
    res.status(404);
    throw new Error('Lead Source not found');
  }
});

const updateLeadSource = asyncHandler(async (req, res) => {
  const { code, name, description } = req.body;

  const leadSource = await LeadSource.findById(req.params.id);

  if (leadSource) {
    // If updating code, ensure it's unique
    if (code && code !== leadSource.code) {
      const existingLeadSource = await LeadSource.findOne({ code });
      if (existingLeadSource) {
        res.status(400);
        throw new Error('Another Lead Source with this code already exists.');
      }
      leadSource.code = code;
    }

    // If updating name, ensure it's unique
    if (name && name !== leadSource.name) {
      const existingLeadSourceName = await LeadSource.findOne({ name });
      if (existingLeadSourceName) {
        res.status(400);
        throw new Error('Another Lead Source with this name already exists.');
      }
      leadSource.name = name;
    }

    leadSource.description = description || leadSource.description;

    const updatedLeadSource = await leadSource.save();
    res.json(updatedLeadSource);
  } else {
    res.status(404);
    throw new Error('Lead Source not found');
  }
});


const deleteLeadSource = asyncHandler(async (req, res) => {
  const leadSource = await LeadSource.findById(req.params.id);

  if (leadSource) {
    await leadSource.remove();
    res.json({ message: 'Lead Source removed' });
  } else {
    res.status(404);
    throw new Error('Lead Source not found');
  }
});

export {
  createLeadSource,
  getLeadSources,
  getLeadSourceById,
  updateLeadSource,
  deleteLeadSource,
};
