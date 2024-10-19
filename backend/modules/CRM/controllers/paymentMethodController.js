import { validationResult } from "express-validator";
import PaymentMethod from "../models/paymentMethodModel.js";

export const createPaymentMethod = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const paymentMethodData = req.body;

    // Create a new PaymentMethod instance
    const paymentMethod = new PaymentMethod(paymentMethodData);
    await paymentMethod.save();

    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all Payment Methods
export const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

