import User2 from "../models/User2.js"; // Update the import path and syntax

// Create User2
export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Checking email:", email);

    // Check if email already exists
    const existingUser = await User2.findOne({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create new user
    const user = new User2(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get User2 by ID
export const getUser = async (req, res) => {
  try {
    const user = await User2.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User2 not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User2 by ID
export const updateUser = async (req, res) => {
  try {
    const user = await User2.findByIdAndUpdate(req.params.user_id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User2 not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete User2 by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User2.findByIdAndDelete(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User2 not found" });
    }
    res.json({ message: "User2 deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all Users
export const listUsers = async (req, res) => {
  try {
    const users = await User2.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
