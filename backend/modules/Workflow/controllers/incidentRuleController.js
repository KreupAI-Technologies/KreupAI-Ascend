import IncidentRule from "../models/incidentRuleModel.js";

// Get all incident rules
export const getAllIncidentRules = async (req, res) => {
  try {
    const incidentRules = await IncidentRule.find().populate(
      "incident_id userid assigned_user Status permission"
    );
    res.status(200).json(incidentRules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new incident rule
export const createIncidentRule = async (req, res) => {
  const {
    incident_id,
    version,
    rule_id,
    sequence,
    userid,
    Division,
    permission,
    assigned_user,
    Status,
    action_time,
    Comments,
    Reminder_1_duration,
    Reminder_2_duration,
    Escalation_duration,
  } = req.body;

  try {
    const newIncidentRule = new IncidentRule({
      incident_id,
      version,
      rule_id,
      sequence,
      userid,
      Division,
      permission,
      assigned_user,
      Status,
      action_time,
      Comments,
      Reminder_1_duration,
      Reminder_2_duration,
      Escalation_duration,
    });

    const savedIncidentRule = await newIncidentRule.save();
    res.status(201).json(savedIncidentRule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get incident rule by ID
export const getIncidentRuleById = async (req, res) => {
  try {
    const incidentRule = await IncidentRule.findById(req.params.id).populate(
      "incident_id userid assigned_user Status permission"
    );
    if (!incidentRule) {
      return res.status(404).json({ message: "Incident rule not found" });
    }
    res.status(200).json(incidentRule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update incident rule
export const updateIncidentRule = async (req, res) => {
  try {
    const updatedIncidentRule = await IncidentRule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIncidentRule) {
      return res.status(404).json({ message: "Incident rule not found" });
    }
    res.status(200).json(updatedIncidentRule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete incident rule
export const deleteIncidentRule = async (req, res) => {
  try {
    const deletedIncidentRule = await IncidentRule.findByIdAndDelete(
      req.params.id
    );
    if (!deletedIncidentRule) {
      return res.status(404).json({ message: "Incident rule not found" });
    }
    res.status(200).json({ message: "Incident rule deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
