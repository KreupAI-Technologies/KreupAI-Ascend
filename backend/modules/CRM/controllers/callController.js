import { validationResult } from "express-validator";
import Call from "../models/callModel.js";

export const createCall =     async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const callData = req.body;
      callData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

      // Create a new Call instance
      const call = new Call(callData);
      await call.save();

      // Populate references for the response
      await call
        .populate('collectionTypeId', 'name')
        .populate('callTypeId', 'name')
        .populate('salesmanId', 'firstName lastName username')
        .populate('createdBy', 'firstName lastName username')
        .execPopulate();

      res.status(201).json(call);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  export const getCalls = async (req, res) => {
    try {
      const calls = await Call.find()
        .populate('collectionTypeId', 'name')
        .populate('callTypeId', 'name')
        .populate('salesmanId', 'firstName lastName username')
        .populate('createdBy', 'firstName lastName username');
      res.json(calls);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export const getCallById = async (req, res) => {
    try {
      const call = await Call.findById(req.params.id)
        .populate('collectionTypeId', 'name')
        .populate('callTypeId', 'name')
        .populate('salesmanId', 'firstName lastName username')
        .populate('createdBy', 'firstName lastName username');
      if (!call) {
        return res.status(404).json({ message: 'Call not found' });
      }
      res.json(call);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateCall =  async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updates = req.body;

      const call = await Call.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      })
        .populate('collectionTypeId', 'name')
        .populate('callTypeId', 'name')
        .populate('salesmanId', 'firstName lastName username')
        .populate('createdBy', 'firstName lastName username');

      if (!call) {
        return res.status(404).json({ message: 'Call not found' });
      }

      res.json(call);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const deleteCall = async (req, res) => {
    try {
      const call = await Call.findByIdAndDelete(req.params.id);
  
      if (!call) {
        return res.status(404).json({ message: 'Call not found' });
      }
  
      res.json({ message: 'Call deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };