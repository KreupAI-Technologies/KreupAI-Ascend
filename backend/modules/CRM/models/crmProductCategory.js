import mongoose from 'mongoose';
// import User from './User.js'; // Import the User model

const { Schema } = mongoose;

// Define the ProductCategory Schema
const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category Name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Category Name cannot exceed 100 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length > 0;
          } catch (error) {
            console.error('Validation error in name:', error);
            return false;
          }
        },
        message: 'Category Name cannot be empty.',
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      validate: {
        validator: function (v) {
          try {
            return v.length <= 500;
          } catch (error) {
            console.error('Validation error in description:', error);
            return false;
          }
        },
        message: 'Description cannot exceed 500 characters.',
      },
    },
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      validate: [
        {
          validator: function (value) {
            // Allow null or valid ObjectId
            return !value || mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Parent Category ID',
        },
        {
          validator: async function (value) {
            if (!value) return true; // Skip if not provided
            try {
              const parentCategory = await mongoose
                .model('ProductCategory')
                .findById(value);
              return !!parentCategory;
            } catch (error) {
              console.error('Validation error in parentCategoryId async validator:', error);
              return false;
            }
          },
          message: (props) => `Parent Category ID ${props.value} does not exist`,
        },
      ],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created By is required'],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: 'Invalid Created By User ID',
        },
        {
          validator: async function (value) {
            try {
              const user = await User.findById(value);
              return !!user;
            } catch (error) {
              console.error('Validation error in createdBy async validator:', error);
              return false;
            }
          },
          message: (props) => `Created By User ID ${props.value} does not exist`,
        },
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'lastModifiedDate',
    },
  }
);

// Index for unique category names
productCategorySchema.index({ name: 1 }, { unique: true });

// Pre-save hook to prevent circular references
productCategorySchema.pre('save', async function (next) {
  if (this.parentCategoryId) {
    if (this.parentCategoryId.equals(this._id)) {
      return next(new Error('A category cannot be its own parent.'));
    }

    // Check for deeper circular references
    let parent = await mongoose
      .model('ProductCategory')
      .findById(this.parentCategoryId);
    while (parent) {
      if (parent.parentCategoryId && parent.parentCategoryId.equals(this._id)) {
        return next(
          new Error('Circular reference detected in parent categories.')
        );
      }
      parent = parent.parentCategoryId
        ? await mongoose.model('ProductCategory').findById(parent.parentCategoryId)
        : null;
    }
  }
  next();
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

export default ProductCategory;