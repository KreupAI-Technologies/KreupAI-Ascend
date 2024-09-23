// controllers/productCategoryController.js

import ProductCategory from '../models/crmProductCategory.js';
import asyncHandler from 'express-async-handler';


const createProductCategory = asyncHandler(async (req, res) => {
  const { name, description, parentCategoryId, createdBy } = req.body;

  // Check if category with the same name already exists
  const existingCategory = await ProductCategory.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error('Product Category with this name already exists.');
  }

  const productCategory = new ProductCategory({
    name,
    description,
    parentCategoryId,
    createdBy,
  });

  const createdCategory = await productCategory.save();
  res.status(201).json(createdCategory);
});


const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await ProductCategory.find()
    .populate('parentCategoryId', 'name')
    .populate('createdBy', 'name email');
  res.json(categories);
});


const getProductCategoryById = asyncHandler(async (req, res) => {
  const category = await ProductCategory.findById(req.params.id)
    .populate('parentCategoryId', 'name')
    .populate('createdBy', 'name email');

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Product Category not found');
  }
});


const updateProductCategory = asyncHandler(async (req, res) => {
  const { name, description, parentCategoryId, createdBy } = req.body;

  const category = await ProductCategory.findById(req.params.id);

  if (category) {
    // If updating name, ensure it's unique
    if (name && name !== category.name) {
      const existingCategory = await ProductCategory.findOne({ name });
      if (existingCategory) {
        res.status(400);
        throw new Error('Another Product Category with this name already exists.');
      }
      category.name = name;
    }

    category.description = description || category.description;
    category.parentCategoryId = parentCategoryId || category.parentCategoryId;
    category.createdBy = createdBy || category.createdBy;
    category.modifiedAt = new Date();

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Product Category not found');
  }
});


const deleteProductCategory = asyncHandler(async (req, res) => {
  const category = await ProductCategory.findById(req.params.id);

  if (category) {
    // Optionally, check if this category has child categories
    const childCategories = await ProductCategory.find({ parentCategoryId: category._id });
    if (childCategories.length > 0) {
      res.status(400);
      throw new Error('Cannot delete category with child categories.');
    }

    await category.remove();
    res.json({ message: 'Product Category removed' });
  } else {
    res.status(404);
    throw new Error('Product Category not found');
  }
});

export {
  createProductCategory,
  getProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};
