//Debayan
//21.9.24

import WorkflowTemplate from "../models/workflowTemplateModel.js";

// Create a new workflow template
export const createWorkflowTemplate = async (req, res) => {
  const template = new WorkflowTemplate(req.body);
  try {
    const newTemplate = await template.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all workflow templates
export const getAllWorkflowTemplates = async (req, res) => {
  try {
    const templates = await WorkflowTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single workflow template by ID
export const getWorkflowTemplateById = async (req, res) => {
  try {
    const template = await WorkflowTemplate.findById(req.params.id);
    if (!template)
      return res.status(404).json({ message: "Template not found" });
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a workflow template
export const updateWorkflowTemplate = async (req, res) => {
  try {
    const updatedTemplate = await WorkflowTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTemplate)
      return res.status(404).json({ message: "Template not found" });
    res.json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a workflow template
export const deleteWorkflowTemplate = async (req, res) => {
  try {
    const deletedTemplate = await WorkflowTemplate.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTemplate)
      return res.status(404).json({ message: "Template not found" });
    res.json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
