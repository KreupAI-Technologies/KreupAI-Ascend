import Role from "../models/Role.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const {
      role_name,
      role_description,
      permissions,
      created_by,
      last_modified_by,
    } = req.body;

    const role = new Role({
      role_name,
      role_description,
      permissions,
      created_by,
      last_modified_by,
    });

    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

// Get a role by ID
export const getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error fetching role", error });
  }
};

// Update a role by ID
export const updateRole = async (req, res) => {
  try {
    const { role_name, role_description, permissions, last_modified_by } =
      req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        role_name,
        role_description,
        permissions,
        last_modified_by,
        last_modified_date: Date.now(),
      },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role updated successfully", updatedRole });
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

// Delete a role by ID
export const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};

// List all roles
export const listRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error listing roles", error });
  }
};
