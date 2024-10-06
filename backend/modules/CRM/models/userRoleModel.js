import mongoose from 'mongoose'
import User from '../../../models/userModel.js';
import Role from './roleModel.js';

const userRoleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async function (value) {
          const user = await User.findById(value);
          return !!user;
        },
        message: (props) => `User ID ${props.value} does not exist`,
      },
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
      validate: {
        validator: async function (value) {
          const role = await Role.findById(value);
          return !!role;
        },
        message: (props) => `Role ID ${props.value} does not exist`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique compound index to prevent duplicate user-role pairs
userRoleSchema.index({ userId: 1, roleId: 1 }, { unique: true });

const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole;
