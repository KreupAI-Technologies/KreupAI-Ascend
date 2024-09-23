// controllers/accountController.js

import Account from '../models/crmAccount.js';
import asyncHandler from 'express-async-handler';


const createAccount = asyncHandler(async (req, res) => {
  const {
    clientId,
    clientName,
    addressId,
    billingAddressId,
    shippingAddressId,
    userId,
    tradeLicense,
    taxId,
    clientTypeId,
    industryId,
    website,
    creditLimit,
    creditDays,
    paymentTermsId,
    deliveryTermsId,
    paymentMethodId,
    annualIncome,
    numberOfEmployeesRangeId,
    rating,
    phone,
    fax,
    email,
    divisionId,
    createdBy,
    lastModifiedBy,
  } = req.body;

  // Check if account with the same clientId already exists
  const existingAccount = await Account.findOne({ clientId });
  if (existingAccount) {
    res.status(400);
    throw new Error('Account with this Client ID already exists.');
  }

  // Check if account with the same clientName already exists
  const existingAccountName = await Account.findOne({ clientName });
  if (existingAccountName) {
    res.status(400);
    throw new Error('Account with this Client Name already exists.');
  }

  const account = new Account({
    clientId,
    clientName,
    addressId,
    billingAddressId,
    shippingAddressId,
    userId,
    tradeLicense,
    taxId,
    clientTypeId,
    industryId,
    website,
    creditLimit,
    creditDays,
    paymentTermsId,
    deliveryTermsId,
    paymentMethodId,
    annualIncome,
    numberOfEmployeesRangeId,
    rating,
    phone,
    fax,
    email,
    divisionId,
    createdBy,
    lastModifiedBy,
  });

  const createdAccount = await account.save();
  res.status(201).json(createdAccount);
});


const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find()
    .populate('addressId', 'addressLines cityId stateId countryId postalCode')
    .populate('billingAddressId', 'addressLines cityId stateId countryId postalCode')
    .populate('shippingAddressId', 'addressLines cityId stateId countryId postalCode')
    .populate('userId', 'name email')
    .populate('clientTypeId', 'name statusGroup')
    .populate('industryId', 'code name')
    .populate('paymentTermsId', 'name days')
    .populate('deliveryTermsId', 'name description')
    .populate('paymentMethodId', 'name')
    .populate('numberOfEmployeesRangeId', 'name statusGroup')
    .populate('divisionId', 'code name');
  res.json(accounts);
});

const getAccountById = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id)
    .populate('addressId', 'addressLines cityId stateId countryId postalCode')
    .populate('billingAddressId', 'addressLines cityId stateId countryId postalCode')
    .populate('shippingAddressId', 'addressLines cityId stateId countryId postalCode')
    .populate('userId', 'name email')
    .populate('clientTypeId', 'name statusGroup')
    .populate('industryId', 'code name')
    .populate('paymentTermsId', 'name days')
    .populate('deliveryTermsId', 'name description')
    .populate('paymentMethodId', 'name')
    .populate('numberOfEmployeesRangeId', 'name statusGroup')
    .populate('divisionId', 'code name');

  if (account) {
    res.json(account);
  } else {
    res.status(404);
    throw new Error('Account not found');
  }
});


const updateAccount = asyncHandler(async (req, res) => {
  const {
    clientId,
    clientName,
    addressId,
    billingAddressId,
    shippingAddressId,
    userId,
    tradeLicense,
    taxId,
    clientTypeId,
    industryId,
    website,
    creditLimit,
    creditDays,
    paymentTermsId,
    deliveryTermsId,
    paymentMethodId,
    annualIncome,
    numberOfEmployeesRangeId,
    rating,
    phone,
    fax,
    email,
    divisionId,
    createdBy,
    lastModifiedBy,
  } = req.body;

  const account = await Account.findById(req.params.id);

  if (account) {
    // If updating clientId, ensure it's unique
    if (clientId && clientId !== account.clientId) {
      const existingAccount = await Account.findOne({ clientId });
      if (existingAccount) {
        res.status(400);
        throw new Error('Another Account with this Client ID already exists.');
      }
      account.clientId = clientId;
    }

    // If updating clientName, ensure it's unique
    if (clientName && clientName !== account.clientName) {
      const existingAccountName = await Account.findOne({ clientName });
      if (existingAccountName) {
        res.status(400);
        throw new Error('Another Account with this Client Name already exists.');
      }
      account.clientName = clientName;
    }

    account.addressId = addressId || account.addressId;
    account.billingAddressId = billingAddressId || account.billingAddressId;
    account.shippingAddressId = shippingAddressId || account.shippingAddressId;
    account.userId = userId || account.userId;
    account.tradeLicense = tradeLicense || account.tradeLicense;
    account.taxId = taxId || account.taxId;
    account.clientTypeId = clientTypeId || account.clientTypeId;
    account.industryId = industryId || account.industryId;
    account.website = website || account.website;
    account.creditLimit = creditLimit !== undefined ? creditLimit : account.creditLimit;
    account.creditDays = creditDays !== undefined ? creditDays : account.creditDays;
    account.paymentTermsId = paymentTermsId || account.paymentTermsId;
    account.deliveryTermsId = deliveryTermsId || account.deliveryTermsId;
    account.paymentMethodId = paymentMethodId || account.paymentMethodId;
    account.annualIncome = annualIncome !== undefined ? annualIncome : account.annualIncome;
    account.numberOfEmployeesRangeId = numberOfEmployeesRangeId || account.numberOfEmployeesRangeId;
    account.rating = rating || account.rating;
    account.phone = phone || account.phone;
    account.fax = fax || account.fax;
    account.email = email || account.email;
    account.divisionId = divisionId || account.divisionId;
    account.createdBy = createdBy || account.createdBy;
    account.lastModifiedBy = lastModifiedBy || account.lastModifiedBy;

    const updatedAccount = await account.save();
    res.json(updatedAccount);
  } else {
    res.status(404);
    throw new Error('Account not found');
  }
});


const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (account) {
    await account.remove();
    res.json({ message: 'Account removed' });
  } else {
    res.status(404);
    throw new Error('Account not found');
  }
});

export {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
