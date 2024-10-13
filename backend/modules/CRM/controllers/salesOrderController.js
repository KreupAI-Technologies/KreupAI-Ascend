import SalesOrder from '../models/SalesOrderModel.js'; 

export const createSalesOrder =async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salesOrderData = req.body;
      salesOrderData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

      // Create a new SalesOrder instance
      const salesOrder = new SalesOrder(salesOrderData);
      await salesOrder.save();

      // Populate references for the response
      await salesOrder
        .populate('quotationId', 'quoteId')
        .populate('opportunityId', 'opportunityName')
        .populate('clientId', 'accountName')
        .populate('salesmanId', 'firstName lastName username')
        .populate('contactId', 'firstName lastName')
        .populate('statusId', 'name')
        .populate('createdBy', 'firstName lastName username')
        .execPopulate();

      res.status(201).json(salesOrder);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Order ID must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };