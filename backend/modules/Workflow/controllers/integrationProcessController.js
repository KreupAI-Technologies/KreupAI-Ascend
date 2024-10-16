import IntegrationProcess from "../models/integrationProcessModel.js";
import StandardRules from "../models/standardRulesModel.js";
import Status from "../../CRM/models/statusModel.js";

// Create an Integration process
export const createIntegrationProcess = async (req, res) => {
  try {
    const {
      incident_process,
      role_id,
      sequence,
      serial_no,
      API_endpoint,
      status,
    } = req.body;

    // Validate if status belongs to the "API Status" group
    const statusData = await Status.findOne({
      _id: status,
      status_group: "API Status",
    });
    if (!statusData) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Validate role_id
    const rule = await StandardRules.findOne({ _id: role_id });
    if (!rule) {
      return res.status(400).json({ message: "Invalid role_id" });
    }

    // Create a new Integration process
    const integrationProcess = new IntegrationProcess({
      incident_process, // Ensure this matches the schema field name
      role_id,
      sequence,
      serial_no,
      API_endpoint,
      status,
    });

    await integrationProcess.save();
    res
      .status(201)
      .json({
        message: "Integration Process Created",
        data: integrationProcess,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Integration processes
export const getIntegrationProcesses = async (req, res) => {
  try {
    const integrationProcesses = await IntegrationProcess.find()
      .populate("role_id")
      .populate("status");
    res.status(200).json({ data: integrationProcesses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Integration process by ID
export const getIntegrationProcessById = async (req, res) => {
  try {
    const { id } = req.params;
    const integrationProcess = await IntegrationProcess.findById(id)
      .populate("role_id")
      .populate("status");

    if (!integrationProcess) {
      return res.status(404).json({ message: "Integration Process not found" });
    }

    res.status(200).json({ data: integrationProcess });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Integration process
export const updateIntegrationProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      incident_header,
      role_id,
      sequence,
      serial_no,
      API_endpoint,
      status,
    } = req.body;

    // Validate if status belongs to the "API Status" group
    const statusData = await Status.findOne({
      _id: status,
      status_group: "API Status",
    });
    if (!statusData) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Validate role_id
    const rule = await StandardRules.findOne({ _id: role_id });
    if (!rule) {
      return res.status(400).json({ message: "Invalid role_id" });
    }

    // Update the Integration process
    const integrationProcess = await IntegrationProcess.findByIdAndUpdate(
      id,
      {
        incident_header,
        role_id,
        sequence,
        serial_no,
        API_endpoint,
        status,
      },
      { new: true }
    );

    if (!integrationProcess) {
      return res.status(404).json({ message: "Integration Process not found" });
    }

    res
      .status(200)
      .json({
        message: "Integration Process Updated",
        data: integrationProcess,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Integration process
export const deleteIntegrationProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const integrationProcess = await IntegrationProcess.findByIdAndDelete(id);

    if (!integrationProcess) {
      return res.status(404).json({ message: "Integration Process not found" });
    }

    res.status(200).json({ message: "Integration Process Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
