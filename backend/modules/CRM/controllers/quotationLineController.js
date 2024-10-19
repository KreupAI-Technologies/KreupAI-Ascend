import { validationResult } from "express-validator";
import QuotationLine from "../models/quotationLineModel.js";
import mongoose from "mongoose";

//Create a new Quotation Line
export const createQuotationLine =  async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const lineData = req.body;
      lineData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

      // Calculate values
      const quantity = parseFloat(lineData.quantity);
      const rate = parseFloat(lineData.rate);
      const discount = parseFloat(lineData.discount || 0);
      const value = quantity * rate;
      const netValue = value - discount;
      const taxPercentage = parseFloat(lineData.taxPercentage);
      const taxAmount = netValue * (taxPercentage / 100);
      const netAmount = netValue + taxAmount;

      lineData.value = value;
      lineData.netValue = netValue;
      lineData.taxAmount = taxAmount;
      lineData.netAmount = netAmount;

      // Create a new QuotationLine instance
      const quotationLine = new QuotationLine(lineData);
      await quotationLine.save();

      res.status(201).json(quotationLine);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Serial Number must be unique within the quotation" });
      }
      res.status(400).json({ message: error.message });
    }
};


  //Get all Quotation Line
  export const getAllQuotationLines = async (req, res) => {
    try {
      const { quotationId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(quotationId)) {
        return res.status(400).json({ message: "Invalid Quotation ID" });
      }
  
      const quotationLines = await QuotationLine.find({ quotationId })
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .populate("modifiedBy", "firstName lastName username")
        .sort({ serialNo: 1 });
  
      res.json(quotationLines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Get a Quotation Line by ID
  export const getQuotationLineById = async (req, res) => {
    try {
      const quotationLine = await QuotationLine.findById(req.params.id)
        .populate("quotationId", "quoteId")
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .populate("modifiedBy", "firstName lastName username");
  
      if (!quotationLine) {
        return res.status(404).json({ message: "Quotation Line not found" });
      }
  
      res.json(quotationLine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //Update a Quotation Line
  export const updateQuotationLine = async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updates = req.body;
      updates.modifiedBy = req.user.userId;
      updates.modifiedAt = new Date();

      // Get existing line to calculate values
      const existingLine = await QuotationLine.findById(req.params.id);
      if (!existingLine) {
        return res.status(404).json({ message: "Quotation Line not found" });
      }

      // Calculate values
      const quantity = parseFloat(updates.quantity || existingLine.quantity);
      const rate = parseFloat(updates.rate || existingLine.rate);
      const discount = parseFloat(updates.discount || existingLine.discount || 0);
      const value = quantity * rate;
      const netValue = value - discount;
      const taxPercentage = parseFloat(
        updates.taxPercentage || existingLine.taxPercentage
      );
      const taxAmount = netValue * (taxPercentage / 100);
      const netAmount = netValue + taxAmount;

      updates.value = value;
      updates.netValue = netValue;
      updates.taxAmount = taxAmount;
      updates.netAmount = netAmount;

      const quotationLine = await QuotationLine.findByIdAndUpdate(
        req.params.id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("quotationId", "quoteId")
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .populate("modifiedBy", "firstName lastName username");

      res.json(quotationLine);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Serial Number must be unique within the quotation" });
      }
      res.status(400).json({ message: error.message });
    }
  };


  //Delete a Quotation Line
  export const deleteQuotationLine = async (req, res) => {
    try {
      const quotationLine = await QuotationLine.findByIdAndDelete(req.params.id);
  
      if (!quotationLine) {
        return res.status(404).json({ message: "Quotation Line not found" });
      }
  
      res.json({ message: "Quotation Line deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };