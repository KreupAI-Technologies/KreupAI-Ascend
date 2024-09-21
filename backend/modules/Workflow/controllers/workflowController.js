import Workflow from "../models/Workflow.js";

// Create a new workflow
export const createWorkflow = async (req, res) => {
  try {
    const newWorkflow = new Workflow(req.body);
    const savedWorkflow = await newWorkflow.save();
    res.status(201).json(savedWorkflow);
  } catch (error) {
    res.status(400).json({ message: "Error creating workflow", error });
  }
};

// Read all workflows
export const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find().populate("lead_id");
    res.status(200).json(workflows);
  } catch (error) {
    res.status(400).json({ message: "Error fetching workflows", error });
  }
};

// Read a single workflow by ID
export const getWorkflowById = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id).populate("lead_id");
    if (!workflow)
      return res.status(404).json({ message: "Workflow not found" });
    res.status(200).json(workflow);
  } catch (error) {
    res.status(400).json({ message: "Error fetching workflow", error });
  }
};

// Update a workflow by ID
export const updateWorkflow = async (req, res) => {
  try {
    const updatedWorkflow = await Workflow.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorkflow)
      return res.status(404).json({ message: "Workflow not found" });
    res.status(200).json(updatedWorkflow);
  } catch (error) {
    res.status(400).json({ message: "Error updating workflow", error });
  }
};

// Delete a workflow by ID
export const deleteWorkflow = async (req, res) => {
  try {
    const deletedWorkflow = await Workflow.findByIdAndDelete(req.params.id);
    if (!deletedWorkflow)
      return res.status(404).json({ message: "Workflow not found" });
    res.status(200).json({ message: "Workflow deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting workflow", error });
  }
};
