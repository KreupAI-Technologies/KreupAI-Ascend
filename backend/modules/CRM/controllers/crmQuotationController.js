// controllers/quotationController.js

import Quotation from '../models/crmQuotation.js';
import asyncHandler from 'express-async-handler';


const createQuotation = asyncHandler(async (req, res) => {
  const {
    quoteId,
    clientId,
    date,
    quoteVersion,
    quoteName,
    opportunityId,
    salesmanId,
    contactId,
    quoteDescription,
    remarks,
    paymentTerm,
    deliveryTerm,
    termsAndConditions,
    totalValue,
    createdBy,
    modifiedBy,
  } = req.body;

  // Check if quotation with the same quoteId already exists
  const existingQuotation = await Quotation.findOne({ quoteId });
  if (existingQuotation) {
    res.status(400);
    throw new Error('Quotation with this Quote ID already exists.');
  }

  // Check if quotation with the same quoteName already exists
  const existingQuotationName = await Quotation.findOne({ quoteName });
  if (existingQuotationName) {
    res.status(400);
    throw new Error('Quotation with this Quote Name already exists.');
  }

  const quotation = new Quotation({
    quoteId,
    clientId,
    date,
    quoteVersion,
    quoteName,
    opportunityId,
    salesmanId,
    contactId,
    quoteDescription,
    remarks,
    paymentTerm,
    deliveryTerm,
    termsAndConditions,
    totalValue,
    createdBy,
    modifiedBy,
  });

  const createdQuotation = await quotation.save();
  res.status(201).json(createdQuotation);
});


const getQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find()
    .populate('clientId', 'clientId clientName')
    .populate('opportunityId', 'opportunityName')
    .populate('salesmanId', 'name email')
    .populate('contactId', 'name email phone')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');
  res.json(quotations);
});


const getQuotationById = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id)
    .populate('clientId', 'clientId clientName')
    .populate('opportunityId', 'opportunityName')
    .populate('salesmanId', 'name email')
    .populate('contactId', 'name email phone')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');

  if (quotation) {
    res.json(quotation);
  } else {
    res.status(404);
    throw new Error('Quotation not found');
  }
});


const updateQuotation = asyncHandler(async (req, res) => {
  const {
    quoteId,
    clientId,
    date,
    quoteVersion,
    quoteName,
    opportunityId,
    salesmanId,
    contactId,
    quoteDescription,
    remarks,
    paymentTerm,
    deliveryTerm,
    termsAndConditions,
    totalValue,
    createdBy,
    modifiedBy,
  } = req.body;

  const quotation = await Quotation.findById(req.params.id);

  if (quotation) {
    // If updating quoteId, ensure it's unique
    if (quoteId && quoteId !== quotation.quoteId) {
      const existingQuotation = await Quotation.findOne({ quoteId });
      if (existingQuotation) {
        res.status(400);
        throw new Error('Another Quotation with this Quote ID already exists.');
      }
      quotation.quoteId = quoteId;
    }

    // If updating quoteName, ensure it's unique
    if (quoteName && quoteName !== quotation.quoteName) {
      const existingQuotationName = await Quotation.findOne({ quoteName });
      if (existingQuotationName) {
        res.status(400);
        throw new Error('Another Quotation with this Quote Name already exists.');
      }
      quotation.quoteName = quoteName;
    }

    quotation.clientId = clientId || quotation.clientId;
    quotation.date = date || quotation.date;
    quotation.quoteVersion = quoteVersion !== undefined ? quoteVersion : quotation.quoteVersion;
    quotation.opportunityId = opportunityId || quotation.opportunityId;
    quotation.salesmanId = salesmanId || quotation.salesmanId;
    quotation.contactId = contactId || quotation.contactId;
    quotation.quoteDescription = quoteDescription || quotation.quoteDescription;
    quotation.remarks = remarks || quotation.remarks;
    quotation.paymentTerm = paymentTerm || quotation.paymentTerm;
    quotation.deliveryTerm = deliveryTerm || quotation.deliveryTerm;
    quotation.termsAndConditions = termsAndConditions || quotation.termsAndConditions;
    quotation.totalValue = totalValue !== undefined ? totalValue : quotation.totalValue;
    quotation.createdBy = createdBy || quotation.createdBy;
    quotation.modifiedBy = modifiedBy || quotation.modifiedBy;
    quotation.modifiedAt = new Date();

    const updatedQuotation = await quotation.save();
    res.json(updatedQuotation);
  } else {
    res.status(404);
    throw new Error('Quotation not found');
  }
});


const deleteQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (quotation) {
    await quotation.remove();
    res.json({ message: 'Quotation removed' });
  } else {
    res.status(404);
    throw new Error('Quotation not found');
  }
});

export {
  createQuotation,
  getQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
};
