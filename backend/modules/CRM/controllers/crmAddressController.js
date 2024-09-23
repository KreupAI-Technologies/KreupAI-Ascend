// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0
import Address from '../models/crmAddress.js';
import asyncHandler from 'express-async-handler';
const createAddress = asyncHandler(async (req, res) => {
  try {
    const { addressLines, cityId, stateId, countryId, postalCode } = req.body;

    const address = new Address({
      addressLines,
      cityId,
      stateId,
      countryId,
      postalCode,
    });

    const createdAddress = await address.save();
    res.status(201).json(createdAddress);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || 'Invalid address data.');
  }
});


const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find()
    .populate('cityId', 'name')
    .populate('stateId', 'name')
    .populate('countryId', 'name');

  res.json(addresses);
});


const getAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id)
    .populate('cityId', 'name')
    .populate('stateId', 'name')
    .populate('countryId', 'name');

  if (address) {
    res.json(address);
  } else {
    res.status(404);
    throw new Error('Address not found');
  }
});


const updateAddress = asyncHandler(async (req, res) => {
  try {
    const { addressLines, cityId, stateId, countryId, postalCode } = req.body;

    const address = await Address.findById(req.params.id);

    if (address) {
      address.addressLines = addressLines || address.addressLines;
      address.cityId = cityId || address.cityId;
      address.stateId = stateId || address.stateId;
      address.countryId = countryId || address.countryId;
      address.postalCode = postalCode || address.postalCode;

      const updatedAddress = await address.save();
      res.json(updatedAddress);
    } else {
      res.status(404);
      throw new Error('Address not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message || 'Invalid address data.');
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (address) {
    await address.remove();
    res.json({ message: 'Address removed' });
  } else {
    res.status(404);
    throw new Error('Address not found');
  }
});

export {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};