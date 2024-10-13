import { validationResult } from "express-validator";
import PriceBook from "../models/priceBookModel";
    //Create a new Price Book
    export const createPriceBook = async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const priceBookData = req.body;
      priceBookData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

      // Create a new PriceBook instance
      const priceBook = new PriceBook(priceBookData);
      await priceBook.save();

      // Populate references for the response
      await priceBook
        .populate('createdBy', 'firstName lastName username')
        .execPopulate();

      res.status(201).json(priceBook);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Price Book ID must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };

  // Get all Price Book
  export const getAllPriceBook =  async (req, res) => {
    try {
      const priceBooks = await PriceBook.find()
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');
      res.json(priceBooks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get a Price Book by ID
  export const getPriceBookById = async (req, res) => {
    try {
      const priceBook = await PriceBook.findById(req.params.id)
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');
      if (!priceBook) {
        return res.status(404).json({ message: 'Price Book not found' });
      }
      res.json(priceBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update a Price Book
  export const updatePriceBook = async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updates = req.body;
      updates.modifiedBy = req.user.userId;
      updates.modifiedAt = new Date();

      const priceBook = await PriceBook.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      })
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');

      if (!priceBook) {
        return res.status(404).json({ message: 'Price Book not found' });
      }

      res.json(priceBook);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Price Book ID must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a Price Book
  export const deletePriceBook = async (req, res) => {
    try {
      const priceBook = await PriceBook.findByIdAndDelete(req.params.id);
  
      if (!priceBook) {
        return res.status(404).json({ message: 'Price Book not found' });
      }
  
      res.json({ message: 'Price Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };