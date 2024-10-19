import { body } from "express-validator";
import SalesOrder from "../modules/CRM/models/salesOrderModel.js";
import mongoose from "mongoose";

export const validateCreateSalesOrder = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isLength({ max: 50 })
    .withMessage("Order ID cannot exceed 50 characters")
    .custom(async (value) => {
      const existingOrder = await SalesOrder.findOne({ orderId: value });
      if (existingOrder) {
        throw new Error("Order ID must be unique");
      }
      return true;
    }),
  body("quotationId")
    .notEmpty()
    .withMessage("Quotation ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Quotation ID");
      }
      const Quotation = mongoose.model("Quotation");
      const quotationExists = await Quotation.exists({ _id: value });
      if (!quotationExists) {
        throw new Error("Quotation not found");
      }
      return true;
    }),
  body("opportunityId")
    .notEmpty()
    .withMessage("Opportunity ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Opportunity ID");
      }
      const Opportunity = mongoose.model("Opportunity");
      const opportunityExists = await Opportunity.exists({ _id: value });
      if (!opportunityExists) {
        throw new Error("Opportunity not found");
      }
      return true;
    }),
  body("clientId")
    .notEmpty()
    .withMessage("Client ID is required"),
    // .custom(async (value) => {
    //   if (!mongoose.Types.ObjectId.isValid(value)) {
    //     throw new Error("Invalid Client ID");
    //   }
    //   const Account = mongoose.model("Account");
    //   const client = await Account.findOne({
    //     _id: value,
    //     accountType: "Customers",
    //   });
    //   if (!client) {
    //     throw new Error('Client not found or is not of type "Customers"');
    //   }
    //   return true;
    // }),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date"),
  body("orderName")
    .notEmpty()
    .withMessage("Order Name is required")
    .isLength({ max: 100 })
    .withMessage("Order Name cannot exceed 100 characters"),
  body("salesmanId")
    .notEmpty()
    .withMessage("Salesman ID is required"),
    // .custom(async (value) => {
    //   if (!mongoose.Types.ObjectId.isValid(value)) {
    //     throw new Error("Invalid Salesman ID");
    //   }
    //   const User = mongoose.model("User");
    //   const user = await User.findOne({ _id: value, role: "Sales" });
    //   if (!user) {
    //     throw new Error('Salesman not found or does not have the role "Sales"');
    //   }
    //   return true;
    // }),
  body("contactId")
    .notEmpty()
    .withMessage("Contact ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Contact ID");
      }
      const Contact = mongoose.model("Contact");
      const contactExists = await Contact.exists({ _id: value });
      if (!contactExists) {
        throw new Error("Contact not found");
      }
      return true;
    }),
  body("orderDescription").optional().trim(),
  body("remarks").optional().trim(),
  body("paymentTerm").optional().trim(),
  body("deliveryTerm").optional().trim(),
  body("termsAndConditions").optional().trim(),
  body("totalValue")
    .notEmpty()
    .withMessage("Total Value is required")
    .isFloat({ min: 0 })
    .withMessage("Total Value cannot be negative"),
  body("statusId")
    .notEmpty()
    .withMessage("Status ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Status ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "ORDER STATUS") {
        throw new Error('Status must belong to "Order Status" status group');
      }
      return true;
    }),
];

export const validateUpdateSalesOrder = [
  body("orderId")
    .optional()
    .notEmpty()
    .withMessage("Order ID cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Order ID cannot exceed 50 characters")
    .custom(async (value, { req }) => {
      const existingOrder = await SalesOrder.findOne({
        orderId: value,
        _id: { $ne: req.params.id },
      });
      if (existingOrder) {
        throw new Error("Order ID must be unique");
      }
      return true;
    }),
  body("quotationId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Quotation ID");
      }
      const Quotation = mongoose.model("Quotation");
      const quotationExists = await Quotation.exists({ _id: value });
      if (!quotationExists) {
        throw new Error("Quotation not found");
      }
      return true;
    }),
  body("opportunityId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Opportunity ID");
      }
      const Opportunity = mongoose.model("Opportunity");
      const opportunityExists = await Opportunity.exists({ _id: value });
      if (!opportunityExists) {
        throw new Error("Opportunity not found");
      }
      return true;
    }),
  body("clientId")
    .optional(),
    // .custom(async (value) => {
    //   if (!mongoose.Types.ObjectId.isValid(value)) {
    //     throw new Error("Invalid Client ID");
    //   }
    //   const Account = mongoose.model("Account");
    //   const client = await Account.findOne({
    //     _id: value,
    //     accountType: "Customers",
    //   });
    //   if (!client) {
    //     throw new Error('Client not found or is not of type "Customers"');
    //   }
    //   return true;
    // }),
  body("date").optional().isISO8601().toDate().withMessage("Invalid Date"),
  body("orderName")
    .optional()
    .notEmpty()
    .withMessage("Order Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Order Name cannot exceed 100 characters"),
  body("salesmanId")
    .optional(),
    // .custom(async (value) => {
    //   if (!mongoose.Types.ObjectId.isValid(value)) {
    //     throw new Error("Invalid Salesman ID");
    //   }
    //   const User = mongoose.model("User");
    //   const user = await User.findOne({ _id: value, role: "Sales" });
    //   if (!user) {
    //     throw new Error('Salesman not found or does not have the role "Sales"');
    //   }
    //   return true;
    // }),
  body("contactId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Contact ID");
      }
      const Contact = mongoose.model("Contact");
      const contactExists = await Contact.exists({ _id: value });
      if (!contactExists) {
        throw new Error("Contact not found");
      }
      return true;
    }),
  body("orderDescription").optional().trim(),
  body("remarks").optional().trim(),
  body("paymentTerm").optional().trim(),
  body("deliveryTerm").optional().trim(),
  body("termsAndConditions").optional().trim(),
  body("totalValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total Value cannot be negative"),
  body("statusId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Status ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "ORDER STATUS") {
        throw new Error('Status must belong to "Order Status" status group');
      }
      return true;
    }),
];
