// controllers/departmentController.js

import Department from '../models/crmDepartment.js';
import asyncHandler from 'express-async-handler';


const createDepartment = asyncHandler(async (req, res) => {
  const { code, name, divisionId, description } = req.body;

  // Check if department with the same code already exists
  const existingDepartment = await Department.findOne({ code });
  if (existingDepartment) {
    res.status(400);
    throw new Error('Department with this code already exists.');
  }

  // Check if department with the same name already exists
  const existingDepartmentName = await Department.findOne({ name });
  if (existingDepartmentName) {
    res.status(400);
    throw new Error('Department with this name already exists.');
  }

  const department = new Department({
    code,
    name,
    divisionId,
    description,
  });

  const createdDepartment = await department.save();
  res.status(201).json(createdDepartment);
});


const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().populate('divisionId', 'code name');
  res.json(departments);
});


const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id).populate('divisionId', 'code name');

  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});


const updateDepartment = asyncHandler(async (req, res) => {
  const { code, name, divisionId, description } = req.body;

  const department = await Department.findById(req.params.id);

  if (department) {
    // If updating code, ensure it's unique
    if (code && code !== department.code) {
      const existingDepartment = await Department.findOne({ code });
      if (existingDepartment) {
        res.status(400);
        throw new Error('Another Department with this code already exists.');
      }
      department.code = code;
    }

    // If updating name, ensure it's unique
    if (name && name !== department.name) {
      const existingDepartmentName = await Department.findOne({ name });
      if (existingDepartmentName) {
        res.status(400);
        throw new Error('Another Department with this name already exists.');
      }
      department.name = name;
    }

    department.divisionId = divisionId || department.divisionId;
    department.description = description || department.description;

    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});


const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    await department.remove();
    res.json({ message: 'Department removed' });
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

export {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
