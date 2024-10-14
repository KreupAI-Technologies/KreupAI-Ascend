import { body } from "express-validator";
import Product from "../modules/CRM/models/productModel.js";

export const validateCreateProduct = [
    body('productCode')
        .notEmpty()
        .withMessage('Product Code is required')
        .isLength({ max: 50 })
        .withMessage('Product Code cannot exceed 50 characters')
        .custom(async (value) => {
            const existingProduct = await Product.findOne({ productCode: value });
            if (existingProduct) {
                throw new Error('Product Code must be unique');
            }
            return true;
        }),
    body('productActive')
        .optional()
        .isBoolean()
        .withMessage('Product Active must be a boolean value'),
    body('productCategoryId')
        .notEmpty()
        .withMessage('Product Category ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Product Category ID');
            }
            const categoryExists = await mongoose.model('ProductCategory').exists({ _id: value });
            if (!categoryExists) {
                throw new Error('Product Category not found');
            }
            return true;
        }),
    body('productName')
        .notEmpty()
        .withMessage('Product Name is required')
        .isLength({ max: 100 })
        .withMessage('Product Name cannot exceed 100 characters'),
    body('vendorId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Vendor ID');
            }
            const Account = mongoose.model('Account');
            const vendor = await Account.findOne({
                _id: value,
                accountType: 'Vendors',
            });
            if (!vendor) {
                throw new Error('Vendor not found or is not of type "Vendors"');
            }
            return true;
        }),
    body('manufacturerId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Manufacturer ID');
            }
            const Account = mongoose.model('Account');
            const manufacturer = await Account.findOne({
                _id: value,
                accountType: 'Vendors',
            });
            if (!manufacturer) {
                throw new Error('Manufacturer not found or is not of type "Vendors"');
            }
            return true;
        }),
    body('salesStartDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Sales Start Date'),
    body('salesEndDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Sales End Date'),
    body('supportStartDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Support Start Date'),
    body('supportEndDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Support End Date'),
    body('unitPrice')
        .notEmpty()
        .withMessage('Unit Price is required')
        .isFloat({ min: 0 })
        .withMessage('Unit Price cannot be negative'),
    body('tag').optional().trim(),
    body('usageUnit').optional().trim(),
    body('box').optional().trim(),
    body('quantityInStock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity In Stock cannot be negative'),
    body('commissionRate')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Commission Rate must be between 0 and 100'),
    body('quantityOrdered')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity Ordered cannot be negative'),
    body('reorderLevel')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Reorder Level cannot be negative'),
    body('handlerId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Handler ID');
            }
            const User = mongoose.model('User');
            const userExists = await User.exists({ _id: value });
            if (!userExists) {
                throw new Error('Handler not found');
            }
            return true;
        }),
    body('description').optional().trim(),
    body('quantityInDemand')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity In Demand cannot be negative'),
];

export const validateUpdateProduct = [
    body('productCode')
        .optional()
        .notEmpty()
        .withMessage('Product Code cannot be empty')
        .isLength({ max: 50 })
        .withMessage('Product Code cannot exceed 50 characters')
        .custom(async (value, { req }) => {
            const existingProduct = await Product.findOne({
                productCode: value,
                _id: { $ne: req.params.id },
            });
            if (existingProduct) {
                throw new Error('Product Code must be unique');
            }
            return true;
        }),
    body('productActive')
        .optional()
        .isBoolean()
        .withMessage('Product Active must be a boolean value'),
    body('productCategoryId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Product Category ID');
            }
            const categoryExists = await mongoose.model('ProductCategory').exists({ _id: value });
            if (!categoryExists) {
                throw new Error('Product Category not found');
            }
            return true;
        }),
    body('productName')
        .optional()
        .notEmpty()
        .withMessage('Product Name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Product Name cannot exceed 100 characters'),
    body('vendorId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Vendor ID');
            }
            const Account = mongoose.model('Account');
            const vendor = await Account.findOne({
                _id: value,
                accountType: 'Vendors',
            });
            if (!vendor) {
                throw new Error('Vendor not found or is not of type "Vendors"');
            }
            return true;
        }),
    body('manufacturerId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Manufacturer ID');
            }
            const Account = mongoose.model('Account');
            const manufacturer = await Account.findOne({
                _id: value,
                accountType: 'Vendors',
            });
            if (!manufacturer) {
                throw new Error('Manufacturer not found or is not of type "Vendors"');
            }
            return true;
        }),
    body('salesStartDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Sales Start Date'),
    body('salesEndDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Sales End Date'),
    body('supportStartDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Support Start Date'),
    body('supportEndDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Support End Date'),
    body('unitPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Unit Price cannot be negative'),
    body('tag').optional().trim(),
    body('usageUnit').optional().trim(),
    body('box').optional().trim(),
    body('quantityInStock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity In Stock cannot be negative'),
    body('commissionRate')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Commission Rate must be between 0 and 100'),
    body('quantityOrdered')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity Ordered cannot be negative'),
    body('reorderLevel')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Reorder Level cannot be negative'),
    body('handlerId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Handler ID');
            }
            const User = mongoose.model('User');
            const userExists = await User.exists({ _id: value });
            if (!userExists) {
                throw new Error('Handler not found');
            }
            return true;
        }),
    body('description').optional().trim(),
    body('quantityInDemand')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity In Demand cannot be negative'),
];