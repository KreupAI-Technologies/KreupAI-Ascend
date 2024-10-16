import { body } from "express-validator";
import Meeting from "../modules/CRM/models/meetingModel.js";

export const validateCreateMeeting = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid Date"),
  body("fromTime")
    .notEmpty()
    .withMessage("From Time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("From Time must be in HH:mm format"),
  body("toTime")
    .notEmpty()
    .withMessage("To Time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("To Time must be in HH:mm format"),
  body("collectionTypeId")
    .notEmpty()
    .withMessage("Collection Type ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Collection Type ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "Collections") {
        throw new Error(
          'Collection Type must belong to "Collections" status group'
        );
      }
      return true;
    }),
  body("collectionId")
    .notEmpty()
    .withMessage("Collection ID is required")
    .custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Collection ID");
      }
      // Validate that the collectionId exists in the specified collection
      const Status = mongoose.model("Status");
      const status = await Status.findById(req.body.collectionTypeId);
      if (!status) {
        throw new Error("Invalid Collection Type");
      }
      const collectionName = status.name;
      const Model = mongoose.model(collectionName);
      const exists = await Model.exists({ _id: value });
      if (!exists) {
        throw new Error(
          `Referenced document not found in ${collectionName} collection`
        );
      }
      return true;
    }),
  body("meetingTypeId")
    .notEmpty()
    .withMessage("Meeting Type ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Meeting Type ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "Meeting") {
        throw new Error('Meeting Type must belong to "Meeting" status group');
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
      const userExists = await User.exists({ _id: value });
      if (!userExists) {
        throw new Error("Salesman not found");
      }
      return true;
    }),
  body("agenda").optional().trim(),
  body("description").optional().trim(),
];

export const validateUpdateMeeting = [
  body("date").optional().isISO8601().toDate().withMessage("Invalid Date"),
  body("fromTime")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("From Time must be in HH:mm format"),
  body("toTime")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("To Time must be in HH:mm format"),
  body("collectionTypeId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Collection Type ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "Collections") {
        throw new Error(
          'Collection Type must belong to "Collections" status group'
        );
      }
      return true;
    }),
  body("collectionId")
    .optional()
    .custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Collection ID");
      }
      // Validate that the collectionId exists in the specified collection
      const Status = mongoose.model("Status");
      const collectionTypeId =
        req.body.collectionTypeId ||
        (await Meeting.findById(req.params.id)).collectionTypeId;
      const status = await Status.findById(collectionTypeId);
      if (!status) {
        throw new Error("Invalid Collection Type");
      }
      const collectionName = status.name;
      const Model = mongoose.model(collectionName);
      const exists = await Model.exists({ _id: value });
      if (!exists) {
        throw new Error(
          `Referenced document not found in ${collectionName} collection`
        );
      }
      return true;
    }),
  body("meetingTypeId")
    .optional()
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Meeting Type ID");
      }
      const Status = mongoose.model("Status");
      const status = await Status.findById(value);
      if (!status || status.statusGroup !== "Meeting") {
        throw new Error('Meeting Type must belong to "Meeting" status group');
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
      const userExists = await User.exists({ _id: value });
      if (!userExists) {
        throw new Error("Salesman not found");
      }
      return true;
    }),
  body("agenda").optional().trim(),
  body("description").optional().trim(),
];
