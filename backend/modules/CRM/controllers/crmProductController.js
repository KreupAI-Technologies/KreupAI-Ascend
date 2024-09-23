// controllers/productController.js

import Product from '../models/crmProduct.js';
import asyncHandler from 'express-async-handler';


const createProduct = asyncHandler(async (req, res) => {
  const {
    productCode,
    productActive,
    productCategoryId,
    productName,
    vendorId,
    manufacturerId,
    salesStartDate,
    salesEndDate,
    supportStartDate,
    supportEndDate,
    unitPrice,
    tag,
    usageUnit,
    box,
    quantityInStock,
    commissionRate,
    quantityOrdered,
    reorderLevel,
    handlerId,
    description,
    quantityInDemand,
    createdBy,
    modifiedBy,
  } = req.body;

  // Check if product with the same productCode already exists
  const existingProduct = await Product.findOne({ productCode });
  if (existingProduct) {
    res.status(400);
    throw new Error('Product with this Product Code already exists.');
  }

  // Check if product with the same productName already exists
  const existingProductName = await Product.findOne({ productName });
  if (existingProductName) {
    res.status(400);
    throw new Error('Product with this Product Name already exists.');
  }

  const product = new Product({
    productCode,
    productActive,
    productCategoryId,
    productName,
    vendorId,
    manufacturerId,
    salesStartDate,
    salesEndDate,
    supportStartDate,
    supportEndDate,
    unitPrice,
    tag,
    usageUnit,
    box,
    quantityInStock,
    commissionRate,
    quantityOrdered,
    reorderLevel,
    handlerId,
    description,
    quantityInDemand,
    createdBy,
    modifiedBy,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate('productCategoryId', 'categoryName')
    .populate('vendorId', 'accountName')
    .populate('manufacturerId', 'accountName')
    .populate('handlerId', 'name email')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');
  res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('productCategoryId', 'categoryName')
    .populate('vendorId', 'accountName')
    .populate('manufacturerId', 'accountName')
    .populate('handlerId', 'name email')
    .populate('createdBy', 'name email')
    .populate('modifiedBy', 'name email');

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


const updateProduct = asyncHandler(async (req, res) => {
  const {
    productCode,
    productActive,
    productCategoryId,
    productName,
    vendorId,
    manufacturerId,
    salesStartDate,
    salesEndDate,
    supportStartDate,
    supportEndDate,
    unitPrice,
    tag,
    usageUnit,
    box,
    quantityInStock,
    commissionRate,
    quantityOrdered,
    reorderLevel,
    handlerId,
    description,
    quantityInDemand,
    createdBy,
    modifiedBy,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // If updating productCode, ensure it's unique
    if (productCode && productCode !== product.productCode) {
      const existingProduct = await Product.findOne({ productCode });
      if (existingProduct) {
        res.status(400);
        throw new Error('Another Product with this Product Code already exists.');
      }
      product.productCode = productCode;
    }

    // If updating productName, ensure it's unique
    if (productName && productName !== product.productName) {
      const existingProductName = await Product.findOne({ productName });
      if (existingProductName) {
        res.status(400);
        throw new Error('Another Product with this Product Name already exists.');
      }
      product.productName = productName;
    }

    product.productActive = productActive !== undefined ? productActive : product.productActive;
    product.productCategoryId = productCategoryId || product.productCategoryId;
    product.vendorId = vendorId || product.vendorId;
    product.manufacturerId = manufacturerId || product.manufacturerId;
    product.salesStartDate = salesStartDate || product.salesStartDate;
    product.salesEndDate = salesEndDate || product.salesEndDate;
    product.supportStartDate = supportStartDate || product.supportStartDate;
    product.supportEndDate = supportEndDate || product.supportEndDate;
    product.unitPrice = unitPrice !== undefined ? unitPrice : product.unitPrice;
    product.tag = tag || product.tag;
    product.usageUnit = usageUnit || product.usageUnit;
    product.box = box || product.box;
    product.quantityInStock = quantityInStock !== undefined ? quantityInStock : product.quantityInStock;
    product.commissionRate = commissionRate !== undefined ? commissionRate : product.commissionRate;
    product.quantityOrdered = quantityOrdered !== undefined ? quantityOrdered : product.quantityOrdered;
    product.reorderLevel = reorderLevel !== undefined ? reorderLevel : product.reorderLevel;
    product.handlerId = handlerId || product.handlerId;
    product.description = description || product.description;
    product.quantityInDemand = quantityInDemand !== undefined ? quantityInDemand : product.quantityInDemand;
    product.createdBy = createdBy || product.createdBy;
    product.modifiedBy = modifiedBy || product.modifiedBy;
    product.modifiedAt = new Date();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
