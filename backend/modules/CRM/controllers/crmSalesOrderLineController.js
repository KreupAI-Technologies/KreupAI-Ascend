// controllers/salesOrderLineController.js

import SalesOrderLine from '../models/crmSalesOrderLine.js';
import asyncHandler from 'express-async-handler';


const createSalesOrderLine = asyncHandler(async (req, res) => {
  const {
    salesOrderId,
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

  // Check if sales order line with the same salesOrderId and serialNo already exists
  const existingSalesOrderLine = await SalesOrderLine.findOne({ salesOrderId, serialNo });
  if (existingSalesOrderLine) {
    res.status(400);
    throw new Error('Sales Order Line with this Serial Number already exists for the given Sales Order.');
  }

  const salesOrderLine = new SalesOrderLine({
    salesOrderId,
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

  const createdSalesOrderLine = await salesOrderLine.save();
  res.status(201).json(createdSalesOrderLine);
});


const getSalesOrderLines = asyncHandler(async (req, res) => {
  const salesOrderLines = await SalesOrderLine.find()
    .populate('salesOrderId', 'orderId orderName')
    .populate('productId', 'productName productCode')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');
  res.json(salesOrderLines);
});


const getSalesOrderLineById = asyncHandler(async (req, res) => {
  const salesOrderLine = await SalesOrderLine.findById(req.params.id)
    .populate('salesOrderId', 'orderId orderName')
    .populate('productId', 'productName productCode')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');

  if (salesOrderLine) {
    res.json(salesOrderLine);
  } else {
    res.status(404);
    throw new Error('Sales Order Line not found');
  }
});


const updateSalesOrderLine = asyncHandler(async (req, res) => {
  const {
    salesOrderId,
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

  const salesOrderLine = await SalesOrderLine.findById(req.params.id);

  if (salesOrderLine) {
    // If updating salesOrderId or serialNo, ensure uniqueness
    if (
      (salesOrderId && salesOrderId !== salesOrderLine.salesOrderId.toString()) ||
      (serialNo && serialNo !== salesOrderLine.serialNo)
    ) {
      const existingSalesOrderLine = await SalesOrderLine.findOne({
        salesOrderId: salesOrderId || salesOrderLine.salesOrderId,
        serialNo: serialNo || salesOrderLine.serialNo,
      });
      if (existingSalesOrderLine) {
        res.status(400);
        throw new Error('Another Sales Order Line with this Serial Number already exists for the given Sales Order.');
      }
    }

    salesOrderLine.salesOrderId = salesOrderId || salesOrderLine.salesOrderId;
    salesOrderLine.serialNo = serialNo !== undefined ? serialNo : salesOrderLine.serialNo;
    salesOrderLine.productId = productId || salesOrderLine.productId;
    salesOrderLine.itemDescription = itemDescription || salesOrderLine.itemDescription;
    salesOrderLine.quantity = quantity !== undefined ? quantity : salesOrderLine.quantity;
    salesOrderLine.rate = rate !== undefined ? rate : salesOrderLine.rate;
    salesOrderLine.value = value !== undefined ? value : salesOrderLine.value;
    salesOrderLine.discount = discount !== undefined ? discount : salesOrderLine.discount;
    salesOrderLine.netValue = netValue !== undefined ? netValue : salesOrderLine.netValue;
    salesOrderLine.taxPercentage = taxPercentage !== undefined ? taxPercentage : salesOrderLine.taxPercentage;
    salesOrderLine.taxAmount = taxAmount !== undefined ? taxAmount : salesOrderLine.taxAmount;
    salesOrderLine.netAmount = netAmount !== undefined ? netAmount : salesOrderLine.netAmount;
    salesOrderLine.createdBy = createdBy || salesOrderLine.createdBy;
    salesOrderLine.modifiedBy = modifiedBy || salesOrderLine.modifiedBy;
    salesOrderLine.modifiedAt = new Date();

    const updatedSalesOrderLine = await salesOrderLine.save();
    res.json(updatedSalesOrderLine);
  } else {
    res.status(404);
    throw new Error('Sales Order Line not found');
  }
});


const deleteSalesOrderLine = asyncHandler(async (req, res) => {
  const salesOrderLine = await SalesOrderLine.findById(req.params.id);

  if (salesOrderLine) {
    await salesOrderLine.remove();
    res.json({ message: 'Sales Order Line removed' });
  } else {
    res.status(404);
    throw new Error('Sales Order Line not found');
  }
});

export {
  createSalesOrderLine,
  getSalesOrderLines,
  getSalesOrderLineById,
  updateSalesOrderLine,
  deleteSalesOrderLine,
};
