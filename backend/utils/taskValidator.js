import { body } from "express-validator";
import Task from "../modules/CRM/models/taskModel.js";
import mongoose from "mongoose";

export const validateCreateTask = [
    body('subject')
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ max: 100 })
        .withMessage('Subject cannot exceed 100 characters'),
    body('description').optional().trim(),
    body('priorityId')
        .notEmpty()
        .withMessage('Priority ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Priority ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Priority') {
                throw new Error('Priority must belong to "Priority" status group');
            }
            return true;
        }),
    body('collectionTypeId')
        .notEmpty()
        .withMessage('Collection Type ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Collections') {
                throw new Error('Collection Type must belong to "Collections" status group');
            }
            return true;
        }),
    body('collectionId')
        .notEmpty()
        .withMessage('Collection ID is required')
        .custom(async (value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection ID');
            }
            // Validate that the collectionId exists in the specified collection
            const Status = mongoose.model('Status');
            const status = await Status.findById(req.body.collectionTypeId);
            if (!status) {
                throw new Error('Invalid Collection Type');
            }
            const collectionName = status.name;
            const Model = mongoose.model(collectionName);
            const exists = await Model.exists({ _id: value });
            if (!exists) {
                throw new Error(`Referenced document not found in ${collectionName} collection`);
            }
            return true;
        }),
    body('dueDate')
        .notEmpty()
        .withMessage('Due Date is required')
        .isISO8601()
        .toDate()
        .withMessage('Invalid Due Date'),
    body('reminder')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Reminder Date'),
    body('userId')
        .notEmpty()
        .withMessage('User ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid User ID');
            }
            const User = mongoose.model('User');
            const userExists = await User.exists({ _id: value });
            if (!userExists) {
                throw new Error('User not found');
            }
            return true;
        }),
    body('statusId')
        .notEmpty()
        .withMessage('Status ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Status ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Task Status') {
                throw new Error('Status must belong to "Task Status" status group');
            }
            return true;
        }),
    body('repeat')
        .optional()
        .isBoolean()
        .withMessage('Repeat must be a boolean value'),
    body('repeatTenure')
        .optional()
        .isIn(['Daily', 'Weekly', 'Monthly', 'Yearly'])
        .withMessage('Repeat Tenure must be one of Daily, Weekly, Monthly, Yearly'),
];

export const validateUpdateTask = [
    body('subject')
        .optional()
        .notEmpty()
        .withMessage('Subject cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Subject cannot exceed 100 characters'),
    body('description').optional().trim(),
    body('priorityId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Priority ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Priority') {
                throw new Error('Priority must belong to "Priority" status group');
            }
            return true;
        }),
    body('collectionTypeId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Collections') {
                throw new Error('Collection Type must belong to "Collections" status group');
            }
            return true;
        }),
    body('collectionId')
        .optional()
        .custom(async (value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Collection ID');
            }
            // Validate that the collectionId exists in the specified collection
            const Status = mongoose.model('Status');
            const collectionTypeId =
                req.body.collectionTypeId || (await Task.findById(req.params.id)).collectionTypeId;
            const status = await Status.findById(collectionTypeId);
            if (!status) {
                throw new Error('Invalid Collection Type');
            }
            const collectionName = status.name;
            const Model = mongoose.model(collectionName);
            const exists = await Model.exists({ _id: value });
            if (!exists) {
                throw new Error(`Referenced document not found in ${collectionName} collection`);
            }
            return true;
        }),
    body('dueDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Due Date'),
    body('reminder')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Reminder Date'),
    body('userId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid User ID');
            }
            const User = mongoose.model('User');
            const userExists = await User.exists({ _id: value });
            if (!userExists) {
                throw new Error('User not found');
            }
            return true;
        }),
    body('statusId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Status ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Task Status') {
                throw new Error('Status must belong to "Task Status" status group');
            }
            return true;
        }),
    body('repeat')
        .optional()
        .isBoolean()
        .withMessage('Repeat must be a boolean value'),
    body('repeatTenure')
        .optional()
        .isIn(['Daily', 'Weekly', 'Monthly', 'Yearly'])
        .withMessage('Repeat Tenure must be one of Daily, Weekly, Monthly, Yearly'),
];
