import SalesOrder from "../models/salesOrderModel.js";
import { validationResult } from "express-validator";

// Create a new Sales Order
export const createSalesOrder = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salesOrderData = req.body;
    salesOrderData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

    // Create a new SalesOrder instance
    const salesOrder = new SalesOrder(salesOrderData);
    await salesOrder.save();

    res.status(201).json(salesOrder);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Order ID must be unique" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get all Sales Orders
export const getAllSalesOrder = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find()
      .populate("quotationId", "quoteId")
      .populate("opportunityId", "opportunityName")
      .populate("clientId", "accountName")
      .populate("salesmanId", "firstName lastName username")
      .populate("contactId", "firstName lastName")
      .populate("statusId", "statusDescription")
      .populate("createdBy", "firstName lastName username")
      .populate("modifiedBy", "firstName lastName username");
    res.json(salesOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Sales Order by ID
export const getSalesOrderById = async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id)
      .populate("quotationId", "quoteId")
      .populate("opportunityId", "opportunityName")
      .populate("clientId", "accountName")
      .populate("salesmanId", "firstName lastName username")
      .populate("contactId", "firstName lastName")
      .populate("statusId", "statusDescription")
      .populate("createdBy", "firstName lastName username")
      .populate("modifiedBy", "firstName lastName username");
    if (!salesOrder) {
      return res.status(404).json({ message: "Sales Order not found" });
    }
    res.json(salesOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Sales Order
export const updateSalesOrder = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;
    updates.modifiedBy = req.user.userId;
    updates.modifiedAt = new Date();

    const salesOrder = await SalesOrder.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("quotationId", "quoteId")
      .populate("opportunityId", "opportunityName")
      .populate("clientId", "accountName")
      .populate("salesmanId", "firstName lastName username")
      .populate("contactId", "firstName lastName")
      .populate("statusId", "statusDescription")
      .populate("createdBy", "firstName lastName username")
      .populate("modifiedBy", "firstName lastName username");

    if (!salesOrder) {
      return res.status(404).json({ message: "Sales Order not found" });
    }

    res.json(salesOrder);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Order ID must be unique" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a Sales Order
export const deleteSalesOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findByIdAndDelete(req.params.id);

    if (!salesOrder) {
      return res.status(404).json({ message: "Sales Order not found" });
    }

    res.json({ message: "Sales Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
