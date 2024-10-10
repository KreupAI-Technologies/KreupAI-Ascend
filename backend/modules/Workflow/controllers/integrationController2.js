import Integration from '../models/Integration.js';
import StandardRules from '../models/StandardRules.js';
import Status from '../models/Status.js';
import IncidentHeader from '../models/incidentHeader.js';

// Create an Integration process
export const createIntegration = async (req, res) => {
  try {
    const { incident_process, role_id, sequence, serial_no, API_endpoint, status } = req.body;

    // Validate if status belongs to the "API Status" group
    const statusData = await Status.findOne({ _id: status, status_group: 'API Status' });
    if (!statusData) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Validate role_id
    const rule = await StandardRules.findOne({ _id: role_id });
    if (!rule) {
      return res.status(400).json({ message: 'Invalid role_id' });
    }

    // Create a new Integration process
    const integration = new Integration({
      incident_process, // Ensure this matches the schema field name
      role_id,
      sequence,
      serial_no,
      API_endpoint,
      status,
    });

    await integration.save();
    res.status(201).json({ message: 'Integration Process Created', data: integration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Integration processes
export const getIntegrations = async (req, res) => {
  try {
    const integrations = await Integration.find()
      .populate('role_id')
      .populate('status');
    res.status(200).json({ data: integrations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Integration process by ID
export const getIntegrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await Integration.findById(id)
      .populate('role_id')
      .populate('status');
    
    if (!integration) {
      return res.status(404).json({ message: 'Integration Process not found' });
    }

    res.status(200).json({ data: integration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Integration process
export const updateIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const { incident_header, role_id, sequence, serial_no, API_endpoint, status } = req.body;

    // Validate if status belongs to the "API Status" group
    const statusData = await Status.findOne({ _id: status, status_group: 'API Status' });
    if (!statusData) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Validate role_id
    const rule = await StandardRules.findOne({ _id: role_id });
    if (!rule) {
      return res.status(400).json({ message: 'Invalid role_id' });
    }

    // Update the Integration process
    const integration = await Integration.findByIdAndUpdate(
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

    if (!integration) {
      return res.status(404).json({ message: 'Integration Process not found' });
    }

    res.status(200).json({ message: 'Integration Process Updated', data: integration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Integration process
export const deleteIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await Integration.findByIdAndDelete(id);

    if (!integration) {
      return res.status(404).json({ message: 'Integration Process not found' });
    }

    res.status(200).json({ message: 'Integration Process Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
