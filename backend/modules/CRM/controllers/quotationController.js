import Quotation from "../models/quotationModel.js";
import mongoose from "mongoose";

// Create a new Quotation
export const createQuotation = ([
    body('quoteId')
        .notEmpty()
        .withMessage('Quote ID is required')
        .isLength({ max: 50 })
        .withMessage('Quote ID cannot exceed 50 characters')
        .custom(async (value) => {
            const existingQuote = await Quotation.findOne({ quoteId: value });
            if (existingQuote) {
                throw new Error('Quote ID must be unique');
            }
            return true;
        }),
    body('clientId')
        .notEmpty()
        .withMessage('Client ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Client ID');
            }
            const Account = mongoose.model('Account');
            const client = await Account.findOne({ _id: value, accountType: 'Customers' });
            if (!client) {
                throw new Error('Client not found or is not of type "Customers"');
            }
            return true;
        }),
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .toDate()
        .withMessage('Invalid Date'),
    body('quoteVersion')
        .notEmpty()
        .withMessage('Quote Version is required')
        .isInt({ min: 1 })
        .withMessage('Quote Version must be at least 1'),
    body('quoteName')
        .notEmpty()
        .withMessage('Quote Name is required')
        .isLength({ max: 100 })
        .withMessage('Quote Name cannot exceed 100 characters'),
    body('opportunityId')
        .notEmpty()
        .withMessage('Opportunity ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Opportunity ID');
            }
            const Opportunity = mongoose.model('Opportunity');
            const opportunityExists = await Opportunity.exists({ _id: value });
            if (!opportunityExists) {
                throw new Error('Opportunity not found');
            }
            return true;
        }),
    body('salesmanId')
        .notEmpty()
        .withMessage('Salesman ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Salesman ID');
            }
            const User = mongoose.model('User');
            const user = await User.findOne({ _id: value, role: 'Sales' });
            if (!user) {
                throw new Error('Salesman not found or does not have the role "Sales"');
            }
            return true;
        }),
    body('contactId')
        .notEmpty()
        .withMessage('Contact ID is required')
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Contact ID');
            }
            const Contact = mongoose.model('Contact');
            const contactExists = await Contact.exists({ _id: value });
            if (!contactExists) {
                throw new Error('Contact not found');
            }
            return true;
        }),
    body('quoteDescription').optional().trim(),
    body('remarks').optional().trim(),
    body('paymentTerm').optional().trim(),
    body('deliveryTerm').optional().trim(),
    body('termsAndConditions').optional().trim(),
    body('totalValue')
        .notEmpty()
        .withMessage('Total Value is required')
        .isFloat({ min: 0 })
        .withMessage('Total Value cannot be negative'),

], async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const quotationData = req.body;
        quotationData.createdBy = req.user.userId; // Assuming `cookieAuthMiddleware` adds `userId` to `req.user`

        // Create a new Quotation instance
        const quotation = new Quotation(quotationData);
        await quotation.save();

        // Populate references for the response
        await quotation
            .populate('clientId', 'accountName')
            .populate('opportunityId', 'opportunityName')
            .populate('salesmanId', 'firstName lastName username')
            .populate('contactId', 'firstName lastName')
            .populate('createdBy', 'firstName lastName username')
            .execPopulate();

        res.status(201).json(quotation);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Quote ID must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
})

// Get all Quotations
export const getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find()
            .populate('clientId', 'accountName')
            .populate('opportunityId', 'opportunityName')
            .populate('salesmanId', 'firstName lastName username')
            .populate('contactId', 'firstName lastName')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');
        res.json(quotations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a Quotation by ID
export const getQuotationById = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id)
            .populate('clientId', 'accountName')
            .populate('opportunityId', 'opportunityName')
            .populate('salesmanId', 'firstName lastName username')
            .populate('contactId', 'firstName lastName')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');
        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }
        res.json(quotation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a Quotation
export const updateQuotation = ([
    body('quoteId')
        .optional()
        .notEmpty()
        .withMessage('Quote ID cannot be empty')
        .isLength({ max: 50 })
        .withMessage('Quote ID cannot exceed 50 characters')
        .custom(async (value, { req }) => {
            const existingQuote = await Quotation.findOne({
                quoteId: value,
                _id: { $ne: req.params.id },
            });
            if (existingQuote) {
                throw new Error('Quote ID must be unique');
            }
            return true;
        }),
    body('clientId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Client ID');
            }
            const Account = mongoose.model('Account');
            const client = await Account.findOne({ _id: value, accountType: 'Customers' });
            if (!client) {
                throw new Error('Client not found or is not of type "Customers"');
            }
            return true;
        }),
    body('date')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid Date'),
    body('quoteVersion')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quote Version must be at least 1'),
    body('quoteName')
        .optional()
        .notEmpty()
        .withMessage('Quote Name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Quote Name cannot exceed 100 characters'),
    body('opportunityId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Opportunity ID');
            }
            const Opportunity = mongoose.model('Opportunity');
            const opportunityExists = await Opportunity.exists({ _id: value });
            if (!opportunityExists) {
                throw new Error('Opportunity not found');
            }
            return true;
        }),
    body('salesmanId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Salesman ID');
            }
            const User = mongoose.model('User');
            const user = await User.findOne({ _id: value, role: 'Sales' });
            if (!user) {
                throw new Error('Salesman not found or does not have the role "Sales"');
            }
            return true;
        }),
    body('contactId')
        .optional()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Contact ID');
            }
            const Contact = mongoose.model('Contact');
            const contactExists = await Contact.exists({ _id: value });
            if (!contactExists) {
                throw new Error('Contact not found');
            }
            return true;
        }),
    body('quoteDescription').optional().trim(),
    body('remarks').optional().trim(),
    body('paymentTerm').optional().trim(),
    body('deliveryTerm').optional().trim(),
    body('termsAndConditions').optional().trim(),
    body('totalValue')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Total Value cannot be negative'),

], async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updates = req.body;
        updates.modifiedBy = req.user.userId;
        updates.modifiedAt = new Date();

        const quotation = await Quotation.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        })
            .populate('clientId', 'accountName')
            .populate('opportunityId', 'opportunityName')
            .populate('salesmanId', 'firstName lastName username')
            .populate('contactId', 'firstName lastName')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');

        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }

        res.json(quotation);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Quote ID must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
})

// Delete a Quotation
export const deleteQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(req.params.id);

        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }

        res.json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

