import { body } from "express-validator";
import Contact from "../modules/CRM/models/contactModel.js";
import mongoose from "mongoose";

export const validateCreateContact = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid User ID");
      }
      return true;
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ max: 50 })
    .withMessage("First Name cannot exceed 50 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ max: 50 })
    .withMessage("Last Name cannot exceed 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (value) => {
      const existingContact = await Contact.findOne({ email: value });
      if (existingContact) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date of Birth"),
  body("assistant")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Assistant cannot exceed 100 characters"),
  body("assistantPhone")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Assistant Phone cannot exceed 20 characters"),
  body("contactName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Contact Name cannot exceed 100 characters"),
  body("reportingTo")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Reporting To Contact ID");
      }
      return true;
    }),
  body("clientId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Client ID");
      }
      return true;
    }),
  // Additional validations for other fields can be added here
];

export const validateUpdateContact = [
  body("userId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid User ID");
      }
      // Validate that the user exists and has the role "Sales" or "Marketing"
      const UserRole = mongoose.model("UserRole"); // Ensure this model exists
      const roles = await UserRole.find({ userId: value }).populate(
        "roleId",
        "name"
      );
      const roleNames = roles.map((role) => role.roleId.name.toLowerCase());
      if (!roleNames.includes("sales") && !roleNames.includes("marketing")) {
        throw new Error('User must have the role "Sales" or "Marketing".');
      }
      return true;
    }),
  body("firstName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("First Name cannot exceed 50 characters"),
  body("lastName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Last Name cannot exceed 50 characters"),
  body("title")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("company")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Company cannot exceed 100 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (value, { req }) => {
      const existingContact = await Contact.findOne({ email: value });
      if (existingContact && existingContact._id.toString() !== req.params.id) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("secondaryEmail")
    .optional()
    .isEmail()
    .withMessage("Invalid Secondary Email"),
  body("emailOptOut")
    .optional()
    .isBoolean()
    .withMessage("emailOptOut must be a boolean value"),
  body("phone")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Phone cannot exceed 20 characters"),
  body("mobile")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Mobile cannot exceed 20 characters"),
  body("fax")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Fax cannot exceed 20 characters"),
  body("industryId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Industry ID");
      }
      return true;
    }),
  body("leadSubSourceId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Lead SubSource ID");
      }
      return true;
    }),
  body("statusId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Status ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "LEAD STATUS") {
        throw new Error('Status must belong to "Lead Status" group.');
      }
      return true;
    }),
  body("ratingId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Rating ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "RATING") {
        throw new Error('Rating must belong to "Rating" group.');
      }
      return true;
    }),
  body("addressId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Address ID");
      }
      return true;
    }),
  body("website")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Website cannot exceed 100 characters")
    .matches(/^(https?:\/\/)?([\w\-]+)\.([a-z]{2,6}\.?)(\/[\w\-]*)*\/?$/, "i")
    .withMessage("Invalid Website URL"),
  body("twitter")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Twitter cannot exceed 100 characters"),
  body("annualRevenue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Annual Revenue must be a positive number"),
  body("numberOfEmployees")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Number of Employees must be a positive integer"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date of Birth"),
  body("assistant")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Assistant cannot exceed 100 characters"),
  body("assistantPhone")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Assistant Phone cannot exceed 20 characters"),
  body("contactName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Contact Name cannot exceed 100 characters"),
  body("reportingTo")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Reporting To Contact ID");
      }
      return true;
    }),
  body("clientId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Client ID");
      }
      return true;
    }),
  // Validate other fields as necessary
];
