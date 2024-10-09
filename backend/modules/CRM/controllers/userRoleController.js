import UserRole from "../models/userRoleModel.js";
import mongoose from "mongoose";

// Assign a role to a user (admin only)
export const assignRole = async (req, res) => {
  try {
    // Check if user has 'admin' role
    // Implement your own logic to verify admin privileges
    // For example, check if req.user.roles includes 'admin'

    const { userId, roleId } = req.body;

    // Validate userId and roleId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: "Invalid Role ID" });
    }

    // Create a new UserRole document
    const userRole = new UserRole({ userId, roleId });

    await userRole.save();

    res.status(201).json(userRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get roles for a user
export const getRolesForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const userRoles = await UserRole.find({ userId }).populate(
      "roleId",
      "name description"
    );

    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get users for a role
export const getUsersForRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: "Invalid Role ID" });
    }

    const userRoles = await UserRole.find({ roleId }).populate(
      "userId",
      "username email"
    );

    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a role from a user (admin only)
export const removeRoleFromUser = async (req, res) => {
  try {
    // Check if user has 'admin' role
    // Implement your own logic to verify admin privileges

    const { userId, roleId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: "Invalid Role ID" });
    }
    

    const userRole = await UserRole.findOneAndDelete({ userId, roleId });

    if (!userRole) {
      return res.status(404).json({ message: "UserRole not found" });
    }

    res.json({ message: "Role removed from user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
