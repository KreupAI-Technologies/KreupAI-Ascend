import { validationResult } from "express-validator";
import ProductCategory from "../models/productCategoryModel.js";

// Create a new Product Category
export const createProductCategory = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const categoryData = req.body;
    categoryData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

    // Create a new ProductCategory instance
    const category = new ProductCategory(categoryData);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Product Category
export const getProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find()
      .populate("parentCategoryId", "name")
      .populate("createdBy", "firstName lastName username");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product Category By Id
export const getProductCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id)
      .populate("parentCategoryId", "name")
      .populate("createdBy", "firstName lastName username");
    if (!category) {
      return res.status(404).json({ message: "Product Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Product Category
export const updateProductCategory = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = req.body;

    const category = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("parentCategoryId", "name")
      .populate("createdBy", "firstName lastName username");

    if (!category) {
      return res.status(404).json({ message: "Product Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Product Category
export const deleteProductCategory = async (req, res) => {
  try {
    // Check if category has subcategories
    const subcategoriesExist = await ProductCategory.exists({
      parentCategoryId: req.params.id,
    });
    if (subcategoriesExist) {
      return res.status(400).json({
        message:
          "Cannot delete category with subcategories. Please delete or reassign subcategories first.",
      });
    }

    const category = await ProductCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Product Category not found" });
    }

    res.json({ message: "Product Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
