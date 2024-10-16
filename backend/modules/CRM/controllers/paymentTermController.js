import { validationResult } from "express-validator";
import PaymentTerm from "../models/paymentTermModel.js";

// Create a new Payment Term
export const createPaymentTerm = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const paymentTermData = req.body;

    // Create a new PaymentTerm instance
    const paymentTerm = new PaymentTerm(paymentTermData);
    await paymentTerm.save();

    res.status(201).json(paymentTerm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Payment Terms
export const getAllPaymentTerms = async (req, res) => {
  try {
    const paymentTerms = await PaymentTerm.find();
    res.json(paymentTerms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Payment Term by ID
export const getPaymentTermById = async (req, res) => {
  try {
    const paymentTerm = await PaymentTerm.findById(req.params.id);
    if (!paymentTerm) {
      return res.status(404).json({ message: "Payment Term not found" });
    }
    res.json(paymentTerm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Payment Term
export const updatePaymentTerm = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;

    const paymentTerm = await PaymentTerm.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!paymentTerm) {
      return res.status(404).json({ message: "Payment Term not found" });
    }
    res.json(paymentTerm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Payment Term
export const deletePaymentTerm = async (req, res) => {
  try {
    const paymentTerm = await PaymentTerm.findByIdAndDelete(req.params.id);
    if (!paymentTerm) {
      return res.status(404).json({ message: "Payment Term not found" });
    }
    res.json({ message: "Payment Term deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
