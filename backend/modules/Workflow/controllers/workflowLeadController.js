import workflowLead from "../models/workflowLeadModel.js";

// Create a new Lead
export const createLead = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Checking email:", email);

    // Check if email already exists
    const existingLead = await workflowLead.findOne({ email: email });
    console.log("Existing lead:", existingLead);

    if (existingLead) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).send(newLead);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await workflowLead.find().populate("assigned_to");
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error); // Log the error to the console
    res.status(400).json({ message: "Error fetching leads", error });
  }
};

// Get a Lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await workflowLead.findById(req.params.id).populate("assigned_to");
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ message: "Error fetching lead", error });
  }
};

// Update a Lead
export const updateLead = async (req, res) => {
  try {
    const lead = await workflowLead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ message: "Error updating lead", error });
  }
};

// Delete a Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await workflowLead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting lead", error });
  }
};
