import { body } from "express-validator";
import SalesOrderLine from "../modules/CRM/models/salesOrderLineModel";

export const validateCreateSalesOrderLine = [
    body("salesOrderId")
      .notEmpty()
      .withMessage("Sales Order ID is required")
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Sales Order ID");
        }
        const SalesOrder = mongoose.model("SalesOrder");
        const salesOrderExists = await SalesOrder.exists({ _id: value });
        if (!salesOrderExists) {
          throw new Error("Sales Order not found");
        }
        return true;
      }),
    body("serialNo")
      .notEmpty()
      .withMessage("Serial Number is required")
      .isInt({ min: 1 })
      .withMessage("Serial Number must be at least 1")
      .custom(async (value, { req }) => {
        const exists = await SalesOrderLine.exists({
          salesOrderId: req.body.salesOrderId,
          serialNo: value,
        });
        if (exists) {
          throw new Error("Serial Number must be unique within the sales order");
        }
        return true;
      }),
    body("productId")
      .notEmpty()
      .withMessage("Product ID is required")
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Product ID");
        }
        const Product = mongoose.model("Product");
        const productExists = await Product.exists({ _id: value });
        if (!productExists) {
          throw new Error("Product not found");
        }
        return true;
      }),
    body("itemDescription")
      .notEmpty()
      .withMessage("Item Description is required")
      .trim(),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isFloat({ min: 0 })
      .withMessage("Quantity cannot be negative"),
    body("rate")
      .notEmpty()
      .withMessage("Rate is required")
      .isFloat({ min: 0 })
      .withMessage("Rate cannot be negative"),
    body("discount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discount cannot be negative"),
    body("taxPercentage")
      .notEmpty()
      .withMessage("Tax Percentage is required")
      .isFloat({ min: 0, max: 100 })
      .withMessage("Tax Percentage must be between 0 and 100"),
  ];

  export const validateUpdateSalesOrderLine = [
    body("serialNo")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Serial Number must be at least 1")
      .custom(async (value, { req }) => {
        const salesOrderLine = await SalesOrderLine.findById(req.params.id);
        if (!salesOrderLine) {
          throw new Error("Sales Order Line not found");
        }
        const exists = await SalesOrderLine.exists({
          salesOrderId: salesOrderLine.salesOrderId,
          serialNo: value,
          _id: { $ne: req.params.id },
        });
        if (exists) {
          throw new Error("Serial Number must be unique within the sales order");
        }
        return true;
      }),
    body("productId")
      .optional()
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Product ID");
        }
        const Product = mongoose.model("Product");
        const productExists = await Product.exists({ _id: value });
        if (!productExists) {
          throw new Error("Product not found");
        }
        return true;
      }),
    body("itemDescription").optional().trim(),
    body("quantity")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Quantity cannot be negative"),
    body("rate")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Rate cannot be negative"),
    body("discount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discount cannot be negative"),
    body("taxPercentage")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Tax Percentage must be between 0 and 100"),
  ];