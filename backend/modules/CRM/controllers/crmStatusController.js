

import Status from '../models/crmStatus.js';
import asyncHandler from 'express-async-handler';


const createStatus = asyncHandler(async (req, res) => {
  const { statusGroup, statusDescription } = req.body;

  // Check if status with the same statusGroup and description already exists
  const existingStatus = await Status.findOne({ statusGroup, statusDescription });
  if (existingStatus) {
    res.status(400);
    throw new Error('Status with this group and description already exists.');
  }

  const status = new Status({
    statusGroup,
    statusDescription,
  });

  const createdStatus = await status.save();
  res.status(201).json(createdStatus);
});


const getStatuses = asyncHandler(async (req, res) => {
  const statuses = await Status.find();
  res.json(statuses);
});


const getStatusById = asyncHandler(async (req, res) => {
  const status = await Status.findById(req.params.id);

  if (status) {
    res.json(status);
  } else {
    res.status(404);
    throw new Error('Status not found');
  }
});


const updateStatus = asyncHandler(async (req, res) => {
  const { statusGroup, statusDescription, isActive } = req.body;

  const status = await Status.findById(req.params.id);

  if (status) {
    // If updating statusGroup, ensure it's unique within its description
    if (statusGroup && statusGroup !== status.statusGroup) {
      const existingStatus = await Status.findOne({ statusGroup, statusDescription });
      if (existingStatus) {
        res.status(400);
        throw new Error('Another Status with this group and description already exists.');
      }
      status.statusGroup = statusGroup;
    }

    // If updating statusDescription, ensure it's unique within its group
    if (statusDescription && statusDescription !== status.statusDescription) {
      const existingStatus = await Status.findOne({ statusGroup, statusDescription });
      if (existingStatus) {
        res.status(400);
        throw new Error('Another Status with this group and description already exists.');
      }
      status.statusDescription = statusDescription;
    }

    if (isActive !== undefined) {
      status.isActive = isActive;
    }

    const updatedStatus = await status.save();
    res.json(updatedStatus);
  } else {
    res.status(404);
    throw new Error('Status not found');
  }
});


const deleteStatus = asyncHandler(async (req, res) => {
  const status = await Status.findById(req.params.id);

  if (status) {
    await status.remove();
    res.json({ message: 'Status removed' });
  } else {
    res.status(404);
    throw new Error('Status not found');
  }
});

export {
  createStatus,
  getStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
};
