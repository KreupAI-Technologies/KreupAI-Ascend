import Quotation from "../models/quotationModel.js";
import { validationResult } from "express-validator";

// Create a new Quotation
export const createQuotation = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const quotationData = req.body;
    quotationData.createdBy = req.user.userId; // Assuming `cookieAuthMiddleware` adds `userId` to `req.user`

    // Create a new Quotation instance
    const quotation = new Quotation(quotationData);
    await quotation.save();

    res.status(201).json(quotation);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Quote ID must be unique" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get all Quotations
export const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate("clientId", "accountName")
      .populate("opportunityId", "opportunityName")
      .populate("salesmanId", "firstName lastName username")
      .populate("contactId", "firstName lastName")
      .populate("createdBy", "firstName lastName username")
      .populate("modifiedBy", "firstName lastName username");
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Quotation by ID
export const getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate("clientId", "accountName")
      .populate("opportunityId", "opportunityName")
      .populate("salesmanId", "firstName lastName username")
      .populate("contactId", "firstName lastName")
      .populate("createdBy", "firstName lastName username")
      .populate("modifiedBy", "firstName lastName username");
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Quotation
export const updateQuotation = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;
    updates.modifiedBy = req.user.userId;
    updates.modifiedAt = new Date();

    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("clientId", "accountName")
      .populate("opportunityId", "opportunityName")
      .populate("salesmanId", "firstName lastName username")
      .populate("contactId", "firstName lastName")
      .populate("createdBy", "firstName lastName username")
      .populate("modifiedBy", "firstName lastName username");

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json(quotation);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Quote ID must be unique" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a Quotation
export const deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json({ message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
