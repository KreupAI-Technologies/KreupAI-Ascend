import { validationResult } from "express-validator";
import ClientPriceBook from "../models/clientPriceBookModel.js";

//create a new client price book
export const createClientPriceBook = async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const clientPriceBookData = req.body;
      clientPriceBookData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

      // Set default values if not provided
      if (!clientPriceBookData.fromDate) {
        clientPriceBookData.fromDate = new Date();
      }
      if (!clientPriceBookData.toDate) {
        const toDate = new Date(clientPriceBookData.fromDate);
        toDate.setFullYear(toDate.getFullYear() + 10);
        clientPriceBookData.toDate = toDate;
      }

      // Check for existing active ClientPriceBook for the same client and price book
      const existingActive = await ClientPriceBook.findOne({
        clientId: clientPriceBookData.clientId,
        priceBookId: clientPriceBookData.priceBookId,
        isActive: true,
      });
      if (existingActive) {
        return res.status(400).json({
          message: 'An active Client Price Book already exists for this client and price book',
        });
      }

      // Create a new ClientPriceBook instance
      const clientPriceBook = new ClientPriceBook(clientPriceBookData);
      await clientPriceBook.save();

      res.status(201).json(clientPriceBook);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: 'An active Client Price Book already exists for this client and price book',
        });
      }
      res.status(400).json({ message: error.message });
    }
  };

  // Get all client price books
  export const getClientPriceBooks = async (req, res) => {
    try {
      const clientPriceBooks = await ClientPriceBook.find()
        .populate('clientId', 'accountName')
        .populate('priceBookId', 'priceBookName')
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');
      res.json(clientPriceBooks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //Get a client price book by ID
  export const getClientPriceBookById = async (req, res) => {
    try {
      const clientPriceBook = await ClientPriceBook.findById(req.params.id)
        .populate('clientId', 'accountName')
        .populate('priceBookId', 'priceBookName')
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');
  
      if (!clientPriceBook) {
        return res.status(404).json({ message: 'Client Price Book not found' });
      }
  
      res.json(clientPriceBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update a Client Price Book
  export const updateClientPriceBook = async (req, res) => {
    try {
      // Fetch existing ClientPriceBook to access existing fromDate
      const existingClientPriceBook = await ClientPriceBook.findById(req.params.id);
      if (!existingClientPriceBook) {
        return res.status(404).json({ message: 'Client Price Book not found' });
      }
      req.existingClientPriceBook = existingClientPriceBook;

      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updates = req.body;
      updates.modifiedBy = req.user.userId;
      updates.modifiedAt = new Date();

      // Check for existing active ClientPriceBook if isActive is being set to true
      if (updates.isActive === true || (updates.isActive === undefined && existingClientPriceBook.isActive)) {
        const clientId = updates.clientId || existingClientPriceBook.clientId;
        const priceBookId = updates.priceBookId || existingClientPriceBook.priceBookId;
        const existingActive = await ClientPriceBook.findOne({
          _id: { $ne: req.params.id },
          clientId,
          priceBookId,
          isActive: true,
        });
        if (existingActive) {
          return res.status(400).json({
            message: 'An active Client Price Book already exists for this client and price book',
          });
        }
      }

      const clientPriceBook = await ClientPriceBook.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      })
        .populate('clientId', 'accountName')
        .populate('priceBookId', 'priceBookName')
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');

      res.json(clientPriceBook);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: 'An active Client Price Book already exists for this client and price book',
        });
      }
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a Client Price Book
  export const deleteClientPriceBook = async (req, res) => {
    try {
      const clientPriceBook = await ClientPriceBook.findByIdAndDelete(req.params.id);
  
      if (!clientPriceBook) {
        return res.status(404).json({ message: 'Client Price Book not found' });
      }
  
      res.json({ message: 'Client Price Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };