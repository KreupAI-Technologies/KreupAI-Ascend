import Quotation from "../modules/CRM/models/quotationModel.js";
import { body } from "express-validator";
import mongoose from "mongoose";

export const validateCreateQuotation = [
  body("quoteId")
    .notEmpty()
    .withMessage("Quote ID is required")
    .isLength({ max: 50 })
    .withMessage("Quote ID cannot exceed 50 characters")
    .custom(async (value) => {
      const existingQuote = await Quotation.findOne({ quoteId: value });
      if (existingQuote) {
        throw new Error("Quote ID must be unique");
      }
      return true;
    }),
  body("clientId")
    .notEmpty()
    .withMessage("Client ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Client ID");
      }
      const Account = mongoose.model("Account");
      const client = await Account.findOne({
        _id: value,
        accountType: "Customers",
      });
      if (!client) {
        throw new Error('Client not found or is not of type "Customers"');
      }
      return true;
    }),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date"),
  body("quoteVersion")
    .notEmpty()
    .withMessage("Quote Version is required")
    .isInt({ min: 1 })
    .withMessage("Quote Version must be at least 1"),
  body("quoteName")
    .notEmpty()
    .withMessage("Quote Name is required")
    .isLength({ max: 100 })
    .withMessage("Quote Name cannot exceed 100 characters"),
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
  body("salesmanId")
    .notEmpty()
    .withMessage("Salesman ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Salesman ID");
      }
      const User = mongoose.model("User");
      const user = await User.findOne({ _id: value, role: "Sales" });
      if (!user) {
        throw new Error('Salesman not found or does not have the role "Sales"');
      }
      return true;
    }),
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
  body("quoteDescription").optional().trim(),
  body("remarks").optional().trim(),
  body("paymentTerm").optional().trim(),
  body("deliveryTerm").optional().trim(),
  body("termsAndConditions").optional().trim(),
  body("totalValue")
    .notEmpty()
    .withMessage("Total Value is required")
    .isFloat({ min: 0 })
    .withMessage("Total Value cannot be negative"),
];

export const validateUpdateQuotation = [
  body("quoteId")
    .optional()
    .notEmpty()
    .withMessage("Quote ID cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Quote ID cannot exceed 50 characters")
    .custom(async (value, { req }) => {
      const existingQuote = await Quotation.findOne({
        quoteId: value,
        _id: { $ne: req.params.id },
      });
      if (existingQuote) {
        throw new Error("Quote ID must be unique");
      }
      return true;
    }),
  body("clientId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Client ID");
      }
      const Account = mongoose.model("Account");
      const client = await Account.findOne({
        _id: value,
        accountType: "Customers",
      });
      if (!client) {
        throw new Error('Client not found or is not of type "Customers"');
      }
      return true;
    }),
  body("date").optional().isISO8601().toDate().withMessage("Invalid Date"),
  body("quoteVersion")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quote Version must be at least 1"),
  body("quoteName")
    .optional()
    .notEmpty()
    .withMessage("Quote Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Quote Name cannot exceed 100 characters"),
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
  body("salesmanId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Salesman ID");
      }
      const User = mongoose.model("User");
      const user = await User.findOne({ _id: value, role: "Sales" });
      if (!user) {
        throw new Error('Salesman not found or does not have the role "Sales"');
      }
      return true;
    }),
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
  body("quoteDescription").optional().trim(),
  body("remarks").optional().trim(),
  body("paymentTerm").optional().trim(),
  body("deliveryTerm").optional().trim(),
  body("termsAndConditions").optional().trim(),
  body("totalValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total Value cannot be negative"),
];
