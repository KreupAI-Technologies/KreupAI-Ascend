// controllers/callController.js

import Call from '../models/crmCall.js';
import asyncHandler from 'express-async-handler';

const createCall = asyncHandler(async (req, res) => {
  const {
    date,
    fromTime,
    toTime,
    callInformation,
    collectionTypeId,
    collectionId,
    callTypeId,
    salesmanId,
    callAgenda,
    callDescription,
    createdBy,
  } = req.body;

  // Check for overlapping calls for the same salesman on the same date
  const overlappingCall = await Call.findOne({
    salesmanId,
    date: new Date(date).setHours(0, 0, 0, 0),
    $or: [
      {
        fromTime: { $lte: toTime },
        toTime: { $gte: fromTime },
      },
    ],
  });

  if (overlappingCall) {
    res.status(400);
    throw new Error('Salesman has an overlapping call during the specified time.');
  }

  const call = new Call({
    date,
    fromTime,
    toTime,
    callInformation,
    collectionTypeId,
    collectionId,
    callTypeId,
    salesmanId,
    callAgenda,
    callDescription,
    createdBy,
  });

  const createdCall = await call.save();
  res.status(201).json(createdCall);
});


const getCalls = asyncHandler(async (req, res) => {
  const calls = await Call.find()
    .populate('collectionTypeId', 'name statusGroup')
    .populate('callTypeId', 'name statusGroup')
    .populate('salesmanId', 'name email')
    .populate('createdBy', 'name email');
  res.json(calls);
});


const getCallById = asyncHandler(async (req, res) => {
  const call = await Call.findById(req.params.id)
    .populate('collectionTypeId', 'name statusGroup')
    .populate('callTypeId', 'name statusGroup')
    .populate('salesmanId', 'name email')
    .populate('createdBy', 'name email');

  if (call) {
    res.json(call);
  } else {
    res.status(404);
    throw new Error('Call not found');
  }
});


const updateCall = asyncHandler(async (req, res) => {
  const {
    date,
    fromTime,
    toTime,
    callInformation,
    collectionTypeId,
    collectionId,
    callTypeId,
    salesmanId,
    callAgenda,
    callDescription,
    createdBy,
  } = req.body;

  const call = await Call.findById(req.params.id);

  if (call) {
    // Check for overlapping calls if date, fromTime, toTime, or salesmanId is being updated
    if (
      (date && date !== call.date.toISOString()) ||
      (fromTime && fromTime !== call.fromTime) ||
      (toTime && toTime !== call.toTime) ||
      (salesmanId && salesmanId !== call.salesmanId.toString())
    ) {
      const overlappingCall = await Call.findOne({
        _id: { $ne: call._id },
        salesmanId: salesmanId || call.salesmanId,
        date: date ? new Date(date).setHours(0, 0, 0, 0) : call.date.setHours(0, 0, 0, 0),
        $or: [
          {
            fromTime: { $lte: toTime || call.toTime },
            toTime: { $gte: fromTime || call.fromTime },
          },
        ],
      });

      if (overlappingCall) {
        res.status(400);
        throw new Error('Salesman has an overlapping call during the specified time.');
      }
    }

    // Update fields
    call.date = date || call.date;
    call.fromTime = fromTime || call.fromTime;
    call.toTime = toTime || call.toTime;
    call.callInformation = callInformation || call.callInformation;
    call.collectionTypeId = collectionTypeId || call.collectionTypeId;
    call.collectionId = collectionId || call.collectionId;
    call.callTypeId = callTypeId || call.callTypeId;
    call.salesmanId = salesmanId || call.salesmanId;
    call.callAgenda = callAgenda || call.callAgenda;
    call.callDescription = callDescription || call.callDescription;
    call.createdBy = createdBy || call.createdBy;
    call.modifiedAt = new Date();

    const updatedCall = await call.save();
    res.json(updatedCall);
  } else {
    res.status(404);
    throw new Error('Call not found');
  }
});


const deleteCall = asyncHandler(async (req, res) => {
  const call = await Call.findById(req.params.id);

  if (call) {
    await call.remove();
    res.json({ message: 'Call removed' });
  } else {
    res.status(404);
    throw new Error('Call not found');
  }
});

export {
  createCall,
  getCalls,
  getCallById,
  updateCall,
  deleteCall,
};
