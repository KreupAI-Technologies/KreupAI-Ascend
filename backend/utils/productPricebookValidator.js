import { body } from "express-validator";
import ProductPriceBook from "../modules/CRM/models/productPricebookModel";

export const validateCreateProductPriceBook = [
    body('priceBookId')
        .notEmpty()
        .withMessage('Price Book ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Price Book ID');
            }
            const PriceBook = mongoose.model('PriceBook');
            const priceBookExists = await PriceBook.exists({ _id: value });
            if (!priceBookExists) {
                throw new Error('Price Book not found');
            }
            return true;
        }),
    body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Product ID');
            }
            const Product = mongoose.model('Product');
            const productExists = await Product.exists({ _id: value });
            if (!productExists) {
                throw new Error('Product not found');
            }
            return true;
        }),
    body('serialNo')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Serial Number must be at least 1'),
    body('fromDate')
        .notEmpty()
        .withMessage('From Date is required')
        .isISO8601()
        .toDate()
        .withMessage('Invalid From Date'),
    body('toDate')
        .notEmpty()
        .withMessage('To Date is required')
        .isISO8601()
        .toDate()
        .withMessage('Invalid To Date')
        .custom((value, { req }) => {
            const fromDate = req.body.fromDate;
            if (new Date(value) <= new Date(fromDate)) {
                throw new Error('To Date must be after From Date');
            }
            return true;
        }),
    body('fromQty')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('From Quantity cannot be negative'),
    body('toQty')
        .notEmpty()
        .withMessage('To Quantity is required')
        .isFloat({ min: 0 })
        .withMessage('To Quantity cannot be negative')
        .custom((value, { req }) => {
            const fromQty = parseFloat(req.body.fromQty || 0);
            if (value < fromQty) {
                throw new Error('To Quantity must be greater than or equal to From Quantity');
            }
            return true;
        }),
    body('standardPrice')
        .notEmpty()
        .withMessage('Standard Price is required')
        .isFloat({ min: 0 })
        .withMessage('Standard Price cannot be negative'),
    body('discountPercentage')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount Percentage must be between 0 and 100'),
    body('discount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Discount cannot be negative'),

]

export const validateUpdateProductPriceBook = [
    body('priceBookId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Price Book ID');
            }
            const PriceBook = mongoose.model('PriceBook');
            const priceBookExists = await PriceBook.exists({ _id: value });
            if (!priceBookExists) {
                throw new Error('Price Book not found');
            }
            return true;
        }),
    body('productId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Product ID');
            }
            const Product = mongoose.model('Product');
            const productExists = await Product.exists({ _id: value });
            if (!productExists) {
                throw new Error('Product not found');
            }
            return true;
        }),
    body('serialNo')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Serial Number must be at least 1'),
    body('fromDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid From Date'),
    body('toDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid To Date')
        .custom((value, { req }) => {
            const fromDate = req.body.fromDate || req.existingData.fromDate;
            if (value && new Date(value) <= new Date(fromDate)) {
                throw new Error('To Date must be after From Date');
            }
            return true;
        }),
    body('fromQty')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('From Quantity cannot be negative'),
    body('toQty')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('To Quantity cannot be negative')
        .custom((value, { req }) => {
            const fromQty = parseFloat(req.body.fromQty || req.existingData.fromQty || 0);
            if (value < fromQty) {
                throw new Error('To Quantity must be greater than or equal to From Quantity');
            }
            return true;
        }),
    body('standardPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Standard Price cannot be negative'),
    body('discountPercentage')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount Percentage must be between 0 and 100'),
    body('discount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Discount cannot be negative'),

]

