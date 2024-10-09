import Role from "../models/roleModel.js";

// Create a new role (admin only)
export const createRole = async (req, res) => {
  try {
    // Check if user has 'admin' role
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description } = req.body;

    const role = new Role({ name, description });

    await role.save();

    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles (admin only)
export const getRoles = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const roles = await Role.find();

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a role by ID (admin only)
export const getRoleById = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const role = await Role.findById(req.params.id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a role (admin only)
export const updateRole = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description } = req.body;

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a role (admin only)
export const deleteRole = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search roles by name or description
export const searchRoles = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description } = req.query;

    const roles = await Role.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { description: { $regex: description, $options: "i" } },
      ],
    });

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
