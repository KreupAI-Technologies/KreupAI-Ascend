import { body } from "express-validator";
import PriceBook from "../modules/CRM/models/priceBookModel.js";
import Account from "../modules/CRM/models/accountModel.js";
export const validateCreateClientPriceBook = [
    body("clientId")
      .notEmpty()
      .withMessage("Client ID is required")
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Client ID");
        }
        const Account = mongoose.model("Account");
        const clientExists = await Account.exists({ _id: value });
        if (!clientExists) {
          throw new Error("Client not found");
        }
        return true;
      }),
    body("priceBookId")
      .notEmpty()
      .withMessage("Price Book ID is required")
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Price Book ID");
        }
        const PriceBook = mongoose.model("PriceBook");
        const priceBookExists = await PriceBook.exists({ _id: value });
        if (!priceBookExists) {
          throw new Error("Price Book not found");
        }
        return true;
      }),
    body("fromDate")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid From Date"),
    body("toDate")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid To Date")
      .custom((value, { req }) => {
        const fromDate = req.body.fromDate || new Date();
        if (value && new Date(value) <= new Date(fromDate)) {
          throw new Error("To Date must be after From Date");
        }
        return true;
      }),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean value"),
  ];

  export const validateUpdateClientPriceBook =  [
    body("clientId")
      .optional()
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Client ID");
        }
        const Account = mongoose.model("Account");
        const clientExists = await Account.exists({ _id: value });
        if (!clientExists) {
          throw new Error("Client not found");
        }
        return true;
      }),
    body("priceBookId")
      .optional()
      .custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error("Invalid Price Book ID");
        }
        const PriceBook = mongoose.model("PriceBook");
        const priceBookExists = await PriceBook.exists({ _id: value });
        if (!priceBookExists) {
          throw new Error("Price Book not found");
        }
        return true;
      }),
    body("fromDate")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid From Date"),
    body("toDate")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid To Date")
      .custom((value, { req }) => {
        const fromDate = req.body.fromDate || req.existingClientPriceBook.fromDate;
        if (value && new Date(value) <= new Date(fromDate)) {
          throw new Error("To Date must be after From Date");
        }
        return true;
      }),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean value"),
  ];