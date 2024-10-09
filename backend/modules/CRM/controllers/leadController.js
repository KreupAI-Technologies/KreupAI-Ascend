import Lead from "../models/leadModel.js";
import mongoose from "mongoose";

// Create a new Lead
export const createLead = async (req, res) => {
  try {
    const leadData = req.body;

    // Ensure required fields are present
    const requiredFields = ["userId", "firstName", "lastName", "email"];
    for (const field of requiredFields) {
      if (!leadData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Validate ObjectIds
    const objectIdFields = [
      "userId",
      "industryId",
      "leadSubSourceId",
      "statusId",
      "ratingId",
      "addressId",
    ];
    for (const field of objectIdFields) {
      if (
        leadData[field] &&
        !mongoose.Types.ObjectId.isValid(leadData[field])
      ) {
        return res.status(400).json({ message: `Invalid ${field}` });
      }
    }

    const lead = new Lead(leadData);
    await lead.save();

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId");
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId");
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Lead
export const updateLead = async (req, res) => {
  try {
    const updates = req.body;

    // Validate ObjectIds
    const objectIdFields = [
      "userId",
      "industryId",
      "leadSubSourceId",
      "statusId",
      "ratingId",
      "addressId",
    ];
    for (const field of objectIdFields) {
      if (updates[field] && !mongoose.Types.ObjectId.isValid(updates[field])) {
        return res.status(400).json({ message: `Invalid ${field}` });
      }
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH for Leads
export const searchLeads = async (req, res) => {
  try {
    const search = req.query.q;
    const leads = await Lead.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId");
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
