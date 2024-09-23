// controllers/leadSubSourceController.js

import LeadSubSource from '../models/crmLeadSubSource.js';
import asyncHandler from 'express-async-handler';


const createLeadSubSource = asyncHandler(async (req, res) => {
  const { code, name, leadSourceId, description } = req.body;

  // Check if lead sub source with the same code already exists
  const existingLeadSubSource = await LeadSubSource.findOne({ code });
  if (existingLeadSubSource) {
    res.status(400);
    throw new Error('Lead Sub Source with this code already exists.');
  }

  // Check if lead sub source with the same name already exists
  const existingLeadSubSourceName = await LeadSubSource.findOne({ name });
  if (existingLeadSubSourceName) {
    res.status(400);
    throw new Error('Lead Sub Source with this name already exists.');
  }

  const leadSubSource = new LeadSubSource({
    code,
    name,
    leadSourceId,
    description,
  });

  const createdLeadSubSource = await leadSubSource.save();
  res.status(201).json(createdLeadSubSource);
});


const getLeadSubSources = asyncHandler(async (req, res) => {
  const leadSubSources = await LeadSubSource.find().populate('leadSourceId', 'code name');
  res.json(leadSubSources);
});

const getLeadSubSourceById = asyncHandler(async (req, res) => {
  const leadSubSource = await LeadSubSource.findById(req.params.id).populate('leadSourceId', 'code name');

  if (leadSubSource) {
    res.json(leadSubSource);
  } else {
    res.status(404);
    throw new Error('Lead Sub Source not found');
  }
});

const updateLeadSubSource = asyncHandler(async (req, res) => {
  const { code, name, leadSourceId, description } = req.body;

  const leadSubSource = await LeadSubSource.findById(req.params.id);

  if (leadSubSource) {
    // If updating code, ensure it's unique
    if (code && code !== leadSubSource.code) {
      const existingLeadSubSource = await LeadSubSource.findOne({ code });
      if (existingLeadSubSource) {
        res.status(400);
        throw new Error('Another Lead Sub Source with this code already exists.');
      }
      leadSubSource.code = code;
    }

    // If updating name, ensure it's unique
    if (name && name !== leadSubSource.name) {
      const existingLeadSubSourceName = await LeadSubSource.findOne({ name });
      if (existingLeadSubSourceName) {
        res.status(400);
        throw new Error('Another Lead Sub Source with this name already exists.');
      }
      leadSubSource.name = name;
    }

    leadSubSource.leadSourceId = leadSourceId || leadSubSource.leadSourceId;
    leadSubSource.description = description || leadSubSource.description;

    const updatedLeadSubSource = await leadSubSource.save();
    res.json(updatedLeadSubSource);
  } else {
    res.status(404);
    throw new Error('Lead Sub Source not found');
  }
});


const deleteLeadSubSource = asyncHandler(async (req, res) => {
  const leadSubSource = await LeadSubSource.findById(req.params.id);

  if (leadSubSource) {
    await leadSubSource.remove();
    res.json({ message: 'Lead Sub Source removed' });
  } else {
    res.status(404);
    throw new Error('Lead Sub Source not found');
  }
});

export {
  createLeadSubSource,
  getLeadSubSources,
  getLeadSubSourceById,
  updateLeadSubSource,
  deleteLeadSubSource,
};
