import Account from "../models/accountModel.js";
import { validationResult } from "express-validator";

// Create a new Account
export const createAccount = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountData = req.body;

    // Create a new Account instance
    const account = new Account(accountData);
    await account.save();

    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find()
      .populate("addressId")
      .populate("billingAddressId")
      .populate("shippingAddressId")
      .populate("userId", "firstName lastName username")
      .populate("clientTypeId", "name")
      .populate("industryId", "name")
      .populate("paymentTermsId", "name")
      .populate("deliveryTermsId", "name")
      .populate("paymentMethodId", "name")
      .populate("numberOfEmployeesRangeId", "name")
      .populate("divisionId", "name")
      .populate("createdBy", "firstName lastName username")
      .populate("lastModifiedBy", "firstName lastName username");
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an Account by ID
export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id)
      .populate("addressId")
      .populate("billingAddressId")
      .populate("shippingAddressId")
      .populate("userId", "firstName lastName username")
      .populate("clientTypeId", "name")
      .populate("industryId", "name")
      .populate("paymentTermsId", "name")
      .populate("deliveryTermsId", "name")
      .populate("paymentMethodId", "name")
      .populate("numberOfEmployeesRangeId", "name")
      .populate("divisionId", "name")
      .populate("createdBy", "firstName lastName username")
      .populate("lastModifiedBy", "firstName lastName username");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Account
export const updateAccount = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = req.body;

    // Update the lastModifiedBy field
    if (req.user && req.user.userId) {
      updates.lastModifiedBy = req.user.userId;
    }

    const account = await Account.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("addressId")
      .populate("billingAddressId")
      .populate("shippingAddressId")
      .populate("userId", "firstName lastName username")
      .populate("clientTypeId", "name")
      .populate("industryId", "name")
      .populate("paymentTermsId", "name")
      .populate("deliveryTermsId", "name")
      .populate("paymentMethodId", "name")
      .populate("numberOfEmployeesRangeId", "name")
      .populate("divisionId", "name")
      .populate("createdBy", "firstName lastName username")
      .populate("lastModifiedBy", "firstName lastName username");

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an Account
export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
