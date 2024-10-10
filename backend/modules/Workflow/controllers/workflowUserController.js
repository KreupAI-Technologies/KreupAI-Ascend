import workflowUser from "../models/workflowUserModel.js"; // Update the import path and syntax

// Create workflowUser
export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Checking email:", email);

    // Check if email already exists
    const existingUser = await workflowUser.findOne({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create new user
    const user = new workflowUser(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get workflowUser by ID
export const getUser = async (req, res) => {
  try {
    const user = await workflowUser.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "workflowUser not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update workflowUser by ID
export const updateUser = async (req, res) => {
  try {
    const user = await workflowUser.findByIdAndUpdate(req.params.user_id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "workflowUser not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete workflowUser by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await workflowUser.findByIdAndDelete(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "workflowUser not found" });
    }
    res.json({ message: "workflowUser deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all Users
export const listUsers = async (req, res) => {
  try {
    const users = await workflowUser.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
