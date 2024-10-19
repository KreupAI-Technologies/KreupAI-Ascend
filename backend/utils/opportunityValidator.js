import { body } from "express-validator";
import Opportunity from "../modules/CRM/models/opportunityModel.js";
import mongoose from "mongoose";

export const validateCreateOpportunity = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid User ID');
            }
            return true;
        }),
    body('accountId')
        .notEmpty()
        .withMessage('Account ID is required')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Account ID');
            }
            return true;
        }),
    body('contactId')
        .notEmpty()
        .withMessage('Contact ID is required')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Contact ID');
            }
            return true;
        }),
    body('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isFloat({ min: 0 })
        .withMessage('Amount must be a positive number'),
    body('dealName')
        .notEmpty()
        .withMessage('Deal Name is required')
        .isLength({ max: 100 })
        .withMessage('Deal Name cannot exceed 100 characters')
        .custom(async (value, { req }) => {
            const existingOpportunity = await Opportunity.findOne({
                dealName: value,
                accountId: req.body.accountId,
            });
            if (existingOpportunity) {
                throw new Error('Opportunity with this Deal Name already exists for the Account');
            }
            return true;
        }),
    body('typeId')
        .notEmpty()
        .withMessage('Type is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'OPPORTUNITY TYPE') {
                throw new Error('Type must belong to "Opportunity Type" status group');
            }
            return true;
        }),
    body('closingDate')
        .notEmpty()
        .withMessage('Closing Date is required')
        .isISO8601()
        .toDate()
        .withMessage('Invalid Closing Date'),
    body('stageId')
        .notEmpty()
        .withMessage('Stage is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Stage ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'OPPORTUNITY STAGE') {
                throw new Error('Stage must belong to "Opportunity Stage" status group');
            }
            return true;
        }),
    body('probabilityPercentage')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Probability Percentage must be between 0 and 100'),
    body('probability')
        .optional()
        .isFloat({ min: 0, max: 1 })
        .withMessage('Probability must be between 0 and 1'),
    // Additional validations for other fields can be added here
]

export const validateUpdateOpportunity = [
    body('userId')
        .optional()
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid User ID');
            }
            return true;
        }),
    body('accountId')
        .optional()
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Account ID');
            }
            return true;
        }),
    body('contactId')
        .optional()
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Contact ID');
            }
            return true;
        }),
    body('amount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Amount must be a positive number'),
    body('dealName')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Deal Name cannot exceed 100 characters')
        .custom(async (value, { req }) => {
            const existingOpportunity = await Opportunity.findOne({
                dealName: value,
                accountId: req.body.accountId || (await Opportunity.findById(req.params.id)).accountId,
                _id: { $ne: req.params.id },
            });
            if (existingOpportunity) {
                throw new Error('Opportunity with this Deal Name already exists for the Account');
            }
            return true;
        }),
    body('typeId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Type ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Opportunity Type') {
                throw new Error('Type must belong to "Opportunity Type" status group');
            }
            return true;
        }),
    body('closingDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Closing Date'),
    body('stageId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Stage ID');
            }
            const Status = mongoose.model('Status');
            const status = await Status.findById(value);
            if (!status || status.statusGroup !== 'Opportunity Stage') {
                throw new Error('Stage must belong to "Opportunity Stage" status group');
            }
            return true;
        }),
    body('probabilityPercentage')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Probability Percentage must be between 0 and 100'),
    body('probability')
        .optional()
        .isFloat({ min: 0, max: 1 })
        .withMessage('Probability must be between 0 and 1'),
    // Additional validations for other fields can be added here
]