import crmDepartment from "../models/crmDepartment.js";
import crmDivision from "../models/crmDivision.js";
import mongoose from "mongoose";

// CREATE a new department
export const createDepartment = async (req, res) => {
  try {
    const { code, name, divisionId, description } = req.body;

    // Validate divisionId
    if (!mongoose.Types.ObjectId.isValid(divisionId)) {
      return res.status(400).json({ message: "Invalid Division ID" });
    }

    const division = await crmDivision.findById(divisionId);
    if (!division) {
      return res
        .status(400)
        .json({ message: `Division ID ${divisionId} does not exist` });
    }

    const department = new crmDepartment({
      code,
      name,
      divisionId,
      description,
    });

    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all departments
export const getAllDepartment = async (req, res) => {
  try {
    const departments = await crmDepartment.find().populate(
      "divisionId",
      "name code"
    );
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ departments by Division ID
export const getDepartmentByDivisionId = async (req, res) => {
  try {
    const { divisionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(divisionId)) {
      return res.status(400).json({ message: "Invalid Division ID" });
    }

    const departments = await crmDepartment.find({ divisionId }).populate(
      "divisionId",
      "name code"
    );
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a department by ID
export const getDepartment = async (req, res) => {
  try {
    const department = await crmDepartment.findById(req.params.id).populate(
      "divisionId",
      "name code"
    );
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a department
export const updateDepartment = async (req, res) => {
  try {
    const { code, name, divisionId, description } = req.body;

    // Validate divisionId if provided
    if (divisionId && !mongoose.Types.ObjectId.isValid(divisionId)) {
      return res.status(400).json({ message: "Invalid Division ID" });
    }

    if (divisionId) {
      const division = await crmDivision.findById(divisionId);
      if (!division) {
        return res
          .status(400)
          .json({ message: `Division ID ${divisionId} does not exist` });
      }
    }

    const department = await crmDepartment.findByIdAndUpdate(
      req.params.id,
      { code, name, divisionId, description },
      { new: true, runValidators: true }
    ).populate("divisionId", "name code");

    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await crmDepartment.findByIdAndDelete(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH departments by name
export const searchDepartment = async (req, res) => {
  try {
    const { name } = req.query;
    const departments = await crmDepartment.find({
      name: { $regex: name, $options: "i" },
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
