import { body } from "express-validator";
import DeliveryTerm from "../modules/CRM/models/deliveryTermModel.js";

export const validateCreateDeliveryTerm = [
    body('name')
        .notEmpty()
        .withMessage('Delivery Term name is required')
        .isLength({ max: 100 })
        .withMessage('Delivery Term name cannot exceed 100 characters')
        .custom(async (value) => {
            const existingTerm = await DeliveryTerm.findOne({ name: value });
            if (existingTerm) {
                throw new Error('Delivery Term name already exists');
            }
            return true;
        }),
    body('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Description cannot exceed 255 characters'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean value'),

];

export const validateUpdateDeliveryTerm = [
    body('name')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Delivery Term name cannot exceed 100 characters')
        .custom(async (value, { req }) => {
            const existingTerm = await DeliveryTerm.findOne({ name: value });
            if (existingTerm && existingTerm._id.toString() !== req.params.id) {
                throw new Error('Delivery Term name already exists');
            }
            return true;
        }),
    body('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Description cannot exceed 255 characters'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean value'),

];