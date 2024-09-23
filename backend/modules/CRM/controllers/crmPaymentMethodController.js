

import PaymentMethod from '../models/crmPaymentMethod.js';
import asyncHandler from 'express-async-handler';


const createPaymentMethod = asyncHandler(async (req, res) => {
  const { name, description, isActive } = req.body;

  // Check if payment method with the same name already exists
  const existingPaymentMethod = await PaymentMethod.findOne({ name });
  if (existingPaymentMethod) {
    res.status(400);
    throw new Error('Payment Method with this name already exists.');
  }

  const paymentMethod = new PaymentMethod({
    name,
    description,
    isActive,
  });

  const createdPaymentMethod = await paymentMethod.save();
  res.status(201).json(createdPaymentMethod);
});


const getPaymentMethods = asyncHandler(async (req, res) => {
  const paymentMethods = await PaymentMethod.find();
  res.json(paymentMethods);
});


const getPaymentMethodById = asyncHandler(async (req, res) => {
  const paymentMethod = await PaymentMethod.findById(req.params.id);

  if (paymentMethod) {
    res.json(paymentMethod);
  } else {
    res.status(404);
    throw new Error('Payment Method not found');
  }
});


const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { name, description, isActive } = req.body;

  const paymentMethod = await PaymentMethod.findById(req.params.id);

  if (paymentMethod) {
    // If updating name, ensure it's unique
    if (name && name !== paymentMethod.name) {
      const existingPaymentMethod = await PaymentMethod.findOne({ name });
      if (existingPaymentMethod) {
        res.status(400);
        throw new Error('Another Payment Method with this name already exists.');
      }
      paymentMethod.name = name;
    }

    paymentMethod.description = description || paymentMethod.description;
    paymentMethod.isActive = isActive !== undefined ? isActive : paymentMethod.isActive;

    const updatedPaymentMethod = await paymentMethod.save();
    res.json(updatedPaymentMethod);
  } else {
    res.status(404);
    throw new Error('Payment Method not found');
  }
});

const deletePaymentMethod = asyncHandler(async (req, res) => {
  const paymentMethod = await PaymentMethod.findById(req.params.id);

  if (paymentMethod) {
    await paymentMethod.remove();
    res.json({ message: 'Payment Method removed' });
  } else {
    res.status(404);
    throw new Error('Payment Method not found');
  }
});

export {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
};
