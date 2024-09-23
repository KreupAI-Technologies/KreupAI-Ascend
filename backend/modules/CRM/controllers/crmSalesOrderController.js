// controllers/salesOrderController.js

import SalesOrder from '../models/crmSalesOrder.js';
// import Quotation from '../models/crmQuotation.js';
import asyncHandler from 'express-async-handler';


const createSalesOrder = asyncHandler(async (req, res) => {
  const {
    orderId,
    quotationId,
    opportunityId,
    clientId,
    date,
    orderName,
    salesmanId,
    contactId,
    orderDescription,
    remarks,
    paymentTerm,
    deliveryTerm,
    termsAndConditions,
    totalValue,
    statusId,
    createdBy,
    modifiedBy,
  } = req.body;

  // Check if sales order with the same orderId already exists
  const existingSalesOrder = await SalesOrder.findOne({ orderId });
  if (existingSalesOrder) {
    res.status(400);
    throw new Error('Sales Order with this Order ID already exists.');
  }

  // Check if sales order with the same orderName already exists
  const existingSalesOrderName = await SalesOrder.findOne({ orderName });
  if (existingSalesOrderName) {
    res.status(400);
    throw new Error('Sales Order with this Order Name already exists.');
  }

  const salesOrder = new SalesOrder({
    orderId,
    quotationId,
    opportunityId,
    clientId,
    date,
    orderName,
    salesmanId,
    contactId,
    orderDescription,
    remarks,
    paymentTerm,
    deliveryTerm,
    termsAndConditions,
    totalValue,
    statusId,
    createdBy,
    modifiedBy,
  });

  const createdSalesOrder = await salesOrder.save();
  res.status(201).json(createdSalesOrder);
});


const getSalesOrders = asyncHandler(async (req, res) => {
  const salesOrders = await SalesOrder.find()
    .populate('quotationId', 'quoteId quoteName')
    .populate('opportunityId', 'opportunityName')
    .populate('clientId', 'clientId clientName')
    .populate('salesmanId', 'name email')
    .populate('contactId', 'name email phone')
    .populate('statusId', 'name statusGroup')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');
  res.json(salesOrders);
});


const getSalesOrderById = asyncHandler(async (req, res) => {
  const salesOrder = await SalesOrder.findById(req.params.id)
    .populate('quotationId', 'quoteId quoteName')
    .populate('opportunityId', 'opportunityName')
    .populate('clientId', 'clientId clientName')
    .populate('salesmanId', 'name email')
    .populate('contactId', 'name email phone')
    .populate('statusId', 'name statusGroup')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');

  if (salesOrder) {
    res.json(salesOrder);
  } else {
    res.status(404);
    throw new Error('Sales Order not found');
  }
});

const updateSalesOrder = asyncHandler(async (req, res) => {
  const {
    orderId,
    quotationId,
    opportunityId,
    clientId,
    date,
    orderName,
    salesmanId,
    contactId,
    orderDescription,
    remarks,
    paymentTerm,
    deliveryTerm,
    termsAndConditions,
    totalValue,
    statusId,
    createdBy,
    modifiedBy,
  } = req.body;

  const salesOrder = await SalesOrder.findById(req.params.id);

  if (salesOrder) {
    // If updating orderId, ensure it's unique
    if (orderId && orderId !== salesOrder.orderId) {
      const existingSalesOrder = await SalesOrder.findOne({ orderId });
      if (existingSalesOrder) {
        res.status(400);
        throw new Error('Another Sales Order with this Order ID already exists.');
      }
      salesOrder.orderId = orderId;
    }

    // If updating orderName, ensure it's unique
    if (orderName && orderName !== salesOrder.orderName) {
      const existingSalesOrderName = await SalesOrder.findOne({ orderName });
      if (existingSalesOrderName) {
        res.status(400);
        throw new Error('Another Sales Order with this Order Name already exists.');
      }
      salesOrder.orderName = orderName;
    }

    salesOrder.quotationId = quotationId || salesOrder.quotationId;
    salesOrder.opportunityId = opportunityId || salesOrder.opportunityId;
    salesOrder.clientId = clientId || salesOrder.clientId;
    salesOrder.date = date || salesOrder.date;
    salesOrder.salesmanId = salesmanId || salesOrder.salesmanId;
    salesOrder.contactId = contactId || salesOrder.contactId;
    salesOrder.orderDescription = orderDescription || salesOrder.orderDescription;
    salesOrder.remarks = remarks || salesOrder.remarks;
    salesOrder.paymentTerm = paymentTerm || salesOrder.paymentTerm;
    salesOrder.deliveryTerm = deliveryTerm || salesOrder.deliveryTerm;
    salesOrder.termsAndConditions = termsAndConditions || salesOrder.termsAndConditions;
    salesOrder.totalValue = totalValue !== undefined ? totalValue : salesOrder.totalValue;
    salesOrder.statusId = statusId || salesOrder.statusId;
    salesOrder.createdBy = createdBy || salesOrder.createdBy;
    salesOrder.modifiedBy = modifiedBy || salesOrder.modifiedBy;
    salesOrder.modifiedAt = new Date();

    const updatedSalesOrder = await salesOrder.save();
    res.json(updatedSalesOrder);
  } else {
    res.status(404);
    throw new Error('Sales Order not found');
  }
});


const deleteSalesOrder = asyncHandler(async (req, res) => {
  const salesOrder = await SalesOrder.findById(req.params.id);

  if (salesOrder) {
    await salesOrder.remove();
    res.json({ message: 'Sales Order removed' });
  } else {
    res.status(404);
    throw new Error('Sales Order not found');
  }
});

export {
  createSalesOrder,
  getSalesOrders,
  getSalesOrderById,
  updateSalesOrder,
  deleteSalesOrder,
};
