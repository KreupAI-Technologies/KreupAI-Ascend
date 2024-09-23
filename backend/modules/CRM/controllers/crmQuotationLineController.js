// controllers/quotationLineController.js

import QuotationLine from '../models/crmQuotationLine.js';
import asyncHandler from 'express-async-handler';


const createQuotationLine = asyncHandler(async (req, res) => {
  const {
    quotationId,
    serialNo,
    productId,
    itemDescription,
    quantity,
    rate,
    value,
    discount,
    netValue,
    taxPercentage,
    taxAmount,
    netAmount,
    createdBy,
    modifiedBy,
  } = req.body;

  // Check if quotation line with the same quotationId and serialNo already exists
  const existingQuotationLine = await QuotationLine.findOne({ quotationId, serialNo });
  if (existingQuotationLine) {
    res.status(400);
    throw new Error('Quotation Line with this Serial Number already exists for the given Quotation.');
  }

  const quotationLine = new QuotationLine({
    quotationId,
    serialNo,
    productId,
    itemDescription,
    quantity,
    rate,
    value,
    discount,
    netValue,
    taxPercentage,
    taxAmount,
    netAmount,
    createdBy,
    modifiedBy,
  });

  const createdQuotationLine = await quotationLine.save();
  res.status(201).json(createdQuotationLine);
});


const getQuotationLines = asyncHandler(async (req, res) => {
  const quotationLines = await QuotationLine.find()
    .populate('quotationId', 'quoteId quoteName')
    .populate('productId', 'productName productCode')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');
  res.json(quotationLines);
});

const getQuotationLineById = asyncHandler(async (req, res) => {
  const quotationLine = await QuotationLine.findById(req.params.id)
    .populate('quotationId', 'quoteId quoteName')
    .populate('productId', 'productName productCode')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');

  if (quotationLine) {
    res.json(quotationLine);
  } else {
    res.status(404);
    throw new Error('Quotation Line not found');
  }
});


const updateQuotationLine = asyncHandler(async (req, res) => {
  const {
    quotationId,
    serialNo,
    productId,
    itemDescription,
    quantity,
    rate,
    value,
    discount,
    netValue,
    taxPercentage,
    taxAmount,
    netAmount,
    createdBy,
    modifiedBy,
  } = req.body;

  const quotationLine = await QuotationLine.findById(req.params.id);

  if (quotationLine) {
    // If updating quotationId or serialNo, ensure uniqueness
    if (
      (quotationId && quotationId !== quotationLine.quotationId.toString()) ||
      (serialNo && serialNo !== quotationLine.serialNo)
    ) {
      const existingQuotationLine = await QuotationLine.findOne({
        quotationId: quotationId || quotationLine.quotationId,
        serialNo: serialNo || quotationLine.serialNo,
      });
      if (existingQuotationLine) {
        res.status(400);
        throw new Error('Another Quotation Line with this Serial Number already exists for the given Quotation.');
      }
    }

    quotationLine.quotationId = quotationId || quotationLine.quotationId;
    quotationLine.serialNo = serialNo !== undefined ? serialNo : quotationLine.serialNo;
    quotationLine.productId = productId || quotationLine.productId;
    quotationLine.itemDescription = itemDescription || quotationLine.itemDescription;
    quotationLine.quantity = quantity !== undefined ? quantity : quotationLine.quantity;
    quotationLine.rate = rate !== undefined ? rate : quotationLine.rate;
    quotationLine.value = value !== undefined ? value : quotationLine.value;
    quotationLine.discount = discount !== undefined ? discount : quotationLine.discount;
    quotationLine.netValue = netValue !== undefined ? netValue : quotationLine.netValue;
    quotationLine.taxPercentage = taxPercentage !== undefined ? taxPercentage : quotationLine.taxPercentage;
    quotationLine.taxAmount = taxAmount !== undefined ? taxAmount : quotationLine.taxAmount;
    quotationLine.netAmount = netAmount !== undefined ? netAmount : quotationLine.netAmount;
    quotationLine.createdBy = createdBy || quotationLine.createdBy;
    quotationLine.modifiedBy = modifiedBy || quotationLine.modifiedBy;
    quotationLine.modifiedAt = new Date();

    const updatedQuotationLine = await quotationLine.save();
    res.json(updatedQuotationLine);
  } else {
    res.status(404);
    throw new Error('Quotation Line not found');
  }
});


const deleteQuotationLine = asyncHandler(async (req, res) => {
  const quotationLine = await QuotationLine.findById(req.params.id);

  if (quotationLine) {
    await quotationLine.remove();
    res.json({ message: 'Quotation Line removed' });
  } else {
    res.status(404);
    throw new Error('Quotation Line not found');
  }
});

export {
  createQuotationLine,
  getQuotationLines,
  getQuotationLineById,
  updateQuotationLine,
  deleteQuotationLine,
};
