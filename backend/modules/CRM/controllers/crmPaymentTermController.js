// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import PaymentTerm from '../models/crmPaymentTerm.js';
import asyncHandler from 'express-async-handler';


const createPaymentTerm = asyncHandler(async (req, res) => {
  const { name, description, days, isActive } = req.body;

  // Check if payment term with the same name already exists
  const existingPaymentTerm = await PaymentTerm.findOne({ name });
  if (existingPaymentTerm) {
    res.status(400);
    throw new Error('Payment Term with this name already exists.');
  }

  const paymentTerm = new PaymentTerm({
    name,
    description,
    days,
    isActive,
  });

  const createdPaymentTerm = await paymentTerm.save();
  res.status(201).json(createdPaymentTerm);
});


const getPaymentTerms = asyncHandler(async (req, res) => {
  const paymentTerms = await PaymentTerm.find();
  res.json(paymentTerms);
});


const getPaymentTermById = asyncHandler(async (req, res) => {
  const paymentTerm = await PaymentTerm.findById(req.params.id);

  if (paymentTerm) {
    res.json(paymentTerm);
  } else {
    res.status(404);
    throw new Error('Payment Term not found');
  }
});

const updatePaymentTerm = asyncHandler(async (req, res) => {
  const { name, description, days, isActive } = req.body;

  const paymentTerm = await PaymentTerm.findById(req.params.id);

  if (paymentTerm) {
    // If updating name, ensure it's unique
    if (name && name !== paymentTerm.name) {
      const existingPaymentTerm = await PaymentTerm.findOne({ name });
      if (existingPaymentTerm) {
        res.status(400);
        throw new Error('Another Payment Term with this name already exists.');
      }
      paymentTerm.name = name;
    }

    paymentTerm.description = description || paymentTerm.description;
    paymentTerm.days = days !== undefined ? days : paymentTerm.days;
    paymentTerm.isActive = isActive !== undefined ? isActive : paymentTerm.isActive;

    const updatedPaymentTerm = await paymentTerm.save();
    res.json(updatedPaymentTerm);
  } else {
    res.status(404);
    throw new Error('Payment Term not found');
  }
});


const deletePaymentTerm = asyncHandler(async (req, res) => {
  const paymentTerm = await PaymentTerm.findById(req.params.id);

  if (paymentTerm) {
    await paymentTerm.remove();
    res.json({ message: 'Payment Term removed' });
  } else {
    res.status(404);
    throw new Error('Payment Term not found');
  }
});

export {
  createPaymentTerm,
  getPaymentTerms,
  getPaymentTermById,
  updatePaymentTerm,
  deletePaymentTerm,
};
