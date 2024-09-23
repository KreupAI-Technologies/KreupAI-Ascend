

import DeliveryTerm from '../models/crmDeliveryTerm.js';
import asyncHandler from 'express-async-handler';


const createDeliveryTerm = asyncHandler(async (req, res) => {
  const { name, description, isActive } = req.body;

  // Check if delivery term with the same name already exists
  const existingDeliveryTerm = await DeliveryTerm.findOne({ name });
  if (existingDeliveryTerm) {
    res.status(400);
    throw new Error('Delivery Term with this name already exists.');
  }

  const deliveryTerm = new DeliveryTerm({
    name,
    description,
    isActive,
  });

  const createdDeliveryTerm = await deliveryTerm.save();
  res.status(201).json(createdDeliveryTerm);
});


const getDeliveryTerms = asyncHandler(async (req, res) => {
  const deliveryTerms = await DeliveryTerm.find();
  res.json(deliveryTerms);
});


const getDeliveryTermById = asyncHandler(async (req, res) => {
  const deliveryTerm = await DeliveryTerm.findById(req.params.id);

  if (deliveryTerm) {
    res.json(deliveryTerm);
  } else {
    res.status(404);
    throw new Error('Delivery Term not found');
  }
});


const updateDeliveryTerm = asyncHandler(async (req, res) => {
  const { name, description, isActive } = req.body;

  const deliveryTerm = await DeliveryTerm.findById(req.params.id);

  if (deliveryTerm) {
    // If updating name, ensure it's unique
    if (name && name !== deliveryTerm.name) {
      const existingDeliveryTerm = await DeliveryTerm.findOne({ name });
      if (existingDeliveryTerm) {
        res.status(400);
        throw new Error('Another Delivery Term with this name already exists.');
      }
      deliveryTerm.name = name;
    }

    deliveryTerm.description = description || deliveryTerm.description;
    deliveryTerm.isActive = isActive !== undefined ? isActive : deliveryTerm.isActive;

    const updatedDeliveryTerm = await deliveryTerm.save();
    res.json(updatedDeliveryTerm);
  } else {
    res.status(404);
    throw new Error('Delivery Term not found');
  }
});

const deleteDeliveryTerm = asyncHandler(async (req, res) => {
  const deliveryTerm = await DeliveryTerm.findById(req.params.id);

  if (deliveryTerm) {
    await deliveryTerm.remove();
    res.json({ message: 'Delivery Term removed' });
  } else {
    res.status(404);
    throw new Error('Delivery Term not found');
  }
});

export {
  createDeliveryTerm,
  getDeliveryTerms,
  getDeliveryTermById,
  updateDeliveryTerm,
  deleteDeliveryTerm,
};
