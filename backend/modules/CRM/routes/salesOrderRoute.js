// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0


import express from 'express';
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import { validateSalesOrder } from '../../../utils/salesOrderValidator.js';
import { createSalesOrder } from '../controllers/salesOrderController';

const router = express.Router();

// Create a new Sales Order
router.post(
    '/sales-orders',
    cookieAuthMiddleware,
    validateSalesOrder,
    createSalesOrder
    
    
  );

  // Get all Sales Orders
router.get('/sales-orders', authMiddleware, async (req, res) => {
    try {
      const salesOrders = await SalesOrder.find()
        .populate('quotationId', 'quoteId')
        .populate('opportunityId', 'opportunityName')
        .populate('clientId', 'accountName')
        .populate('salesmanId', 'firstName lastName username')
        .populate('contactId', 'firstName lastName')
        .populate('statusId', 'name')
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');
      res.json(salesOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get a Sales Order by ID
router.get('/sales-orders/:id', authMiddleware, async (req, res) => {
    try {
      const salesOrder = await SalesOrder.findById(req.params.id)
        .populate('quotationId', 'quoteId')
        .populate('opportunityId', 'opportunityName')
        .populate('clientId', 'accountName')
        .populate('salesmanId', 'firstName lastName username')
        .populate('contactId', 'firstName lastName')
        .populate('statusId', 'name')
        .populate('createdBy', 'firstName lastName username')
        .populate('modifiedBy', 'firstName lastName username');
      if (!salesOrder) {
        return res.status(404).json({ message: 'Sales Order not found' });
      }
      res.json(salesOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update a Sales Order
router.put(
    '/sales-orders/:id',
    authMiddleware,
    [
      body('orderId')
        .optional()
        .notEmpty()
        .withMessage('Order ID cannot be empty')
        .isLength({ max: 50 })
        .withMessage('Order ID cannot exceed 50 characters')
        .custom(async (value, { req }) => {
          const existingOrder = await SalesOrder.findOne({
            orderId: value,
            _id: { $ne: req.params.id },
          });
          if (existingOrder) {
            throw new Error('Order ID must be unique');
          }
          return true;
        }),
      body('quotationId')
        .optional()
        .custom(async (value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid Quotation ID');
          }
          const Quotation = mongoose.model('Quotation');
          const quotationExists = await Quotation.exists({ _id: value });
          if (!quotationExists) {
            throw new Error('Quotation not found');
          }
          return true;
        }),
      body('opportunityId')
        .optional()
        .custom(async (value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid Opportunity ID');
          }
          const Opportunity = mongoose.model('Opportunity');
          const opportunityExists = await Opportunity.exists({ _id: value });
          if (!opportunityExists) {
            throw new Error('Opportunity not found');
          }
          return true;
        }),
      body('clientId')
        .optional()
        .custom(async (value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid Client ID');
          }
          const Account = mongoose.model('Account');
          const client = await Account.findOne({ _id: value, accountType: 'Customers' });
          if (!client) {
            throw new Error('Client not found or is not of type "Customers"');
          }
          return true;
        }),
      body('date')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Date'),
      body('orderName')
        .optional()
        .notEmpty()
        .withMessage('Order Name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Order Name cannot exceed 100 characters'),
      body('salesmanId')
        .optional()
        .custom(async (value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid Salesman ID');
          }
          const User = mongoose.model('User');
          const user = await User.findOne({ _id: value, role: 'Sales' });
          if (!user) {
            throw new Error('Salesman not found or does not have the role "Sales"');
          }
          return true;
        }),
      body('contactId')
        .optional()
        .custom(async (value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid Contact ID');
          }
          const Contact = mongoose.model('Contact');
          const contactExists = await Contact.exists({ _id: value });
          if (!contactExists) {
            throw new Error('Contact not found');
          }
          return true;
        }),
      body('orderDescription').optional().trim(),
      body('remarks').optional().trim(),
      body('paymentTerm').optional().trim(),
      body('deliveryTerm').optional().trim(),
      body('termsAndConditions').optional().trim(),
      body('totalValue')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Total Value cannot be negative'),
      body('statusId')
        .optional()
        .custom(async (value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid Status ID');
          }
          const Status = mongoose.model('Status');
          const status = await Status.findById(value);
          if (!status || status.statusGroup !== 'Order Status') {
            throw new Error('Status must belong to "Order Status" status group');
          }
          return true;
        }),
    ],
    async (req, res) => {
      try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const updates = req.body;
        updates.modifiedBy = req.user.userId;
        updates.modifiedAt = new Date();
  
        const salesOrder = await SalesOrder.findByIdAndUpdate(req.params.id, updates, {
          new: true,
          runValidators: true,
        })
          .populate('quotationId', 'quoteId')
          .populate('opportunityId', 'opportunityName')
          .populate('clientId', 'accountName')
          .populate('salesmanId', 'firstName lastName username')
          .populate('contactId', 'firstName lastName')
          .populate('statusId', 'name')
          .populate('createdBy', 'firstName lastName username')
          .populate('modifiedBy', 'firstName lastName username');
  
        if (!salesOrder) {
          return res.status(404).json({ message: 'Sales Order not found' });
        }
  
        res.json(salesOrder);
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ message: 'Order ID must be unique' });
        }
        res.status(400).json({ message: error.message });
      }
    }
  );

  // Delete a Sales Order
router.delete('/sales-orders/:id', authMiddleware, async (req, res) => {
    try {
      const salesOrder = await SalesOrder.findByIdAndDelete(req.params.id);
  
      if (!salesOrder) {
        return res.status(404).json({ message: 'Sales Order not found' });
      }
  
      res.json({ message: 'Sales Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;
  