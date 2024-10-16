import { validationResult } from "express-validator";
import SalesOrderLine from "../model/salesOrderLineModel.js";

// Create a new Sales Order Line
export const createSalesOrderLine = async (req, res) => {
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

      // Create a new SalesOrderLine instance
      const salesOrderLine = new SalesOrderLine(lineData);
      await salesOrderLine.save();

      // Populate references for the response
      await salesOrderLine
        .populate("salesOrderId", "orderId")
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .execPopulate();

      res.status(201).json(salesOrderLine);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Serial Number must be unique within the sales order" });
      }
      res.status(400).json({ message: error.message });
    }
  };

  // Get all Sales Order Lines for a Sales Order
  export const getAllSalesOrderLine = async (req, res) => {
    try {
      const { salesOrderId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(salesOrderId)) {
        return res.status(400).json({ message: "Invalid Sales Order ID" });
      }
  
      const salesOrderLines = await SalesOrderLine.find({ salesOrderId })
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .populate("modifiedBy", "firstName lastName username")
        .sort({ serialNo: 1 });
  
      res.json(salesOrderLines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get a Sales Order Line by ID
  export const getSalesOrderById = async (req, res) => {
    try {
      const salesOrderLine = await SalesOrderLine.findById(req.params.id)
        .populate("salesOrderId", "orderId")
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .populate("modifiedBy", "firstName lastName username");
  
      if (!salesOrderLine) {
        return res.status(404).json({ message: "Sales Order Line not found" });
      }
  
      res.json(salesOrderLine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update a Sales Order Line
  export const updateSalesOrderLine = async (req, res) => {
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
      const existingLine = await SalesOrderLine.findById(req.params.id);
      if (!existingLine) {
        return res.status(404).json({ message: "Sales Order Line not found" });
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

      const salesOrderLine = await SalesOrderLine.findByIdAndUpdate(
        req.params.id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("salesOrderId", "orderId")
        .populate("productId", "productName")
        .populate("createdBy", "firstName lastName username")
        .populate("modifiedBy", "firstName lastName username");

      res.json(salesOrderLine);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Serial Number must be unique within the sales order" });
      }
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a Sales Order Line
  export const deleteSalesOrderLine = async (req, res) => {
    try {
      const salesOrderLine = await SalesOrderLine.findByIdAndDelete(req.params.id);
  
      if (!salesOrderLine) {
        return res.status(404).json({ message: "Sales Order Line not found" });
      }
  
      res.json({ message: "Sales Order Line deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }