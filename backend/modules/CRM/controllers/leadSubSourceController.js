import LeadSource from "../models/leadSourceModel.js";
import LeadSubSource from "../models/leadSubSourceModel.js";
import mongoose from "mongoose";

// CREATE a new lead sub source
export const createLeadSubSource = async (req, res) => {
  try {
    const { code, name, leadSourceId, description } = req.body;

    // Validate leadSourceId
    if (!mongoose.Types.ObjectId.isValid(leadSourceId)) {
      return res.status(400).json({ message: "Invalid Lead Source ID" });
    }

    const leadSource = await LeadSource.findById(leadSourceId);
    if (!leadSource) {
      return res
        .status(400)
        .json({ message: `Lead Source ID ${leadSourceId} does not exist` });
    }

    const leadSubSource = new LeadSubSource({
      code,
      name,
      leadSourceId,
      description,
    });

    await leadSubSource.save();
    res.status(201).json(leadSubSource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all lead sub sources
export const getLeadSubSources = async (req, res) => {
  try {
    const leadSubSources = await LeadSubSource.find().populate(
      "leadSourceId",
      "name code"
    );
    res.json(leadSubSources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ lead sub sources by Lead Source ID
export const getLeadSubSourcesByLeadSourceId = async (req, res) => {
  try {
    const { leadSourceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(leadSourceId)) {
      return res.status(400).json({ message: "Invalid Lead Source ID" });
    }

    const leadSubSources = await LeadSubSource.find({ leadSourceId }).populate(
      "leadSourceId",
      "name code"
    );
    res.json(leadSubSources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a lead sub source by ID
export const getLeadSubSourceById = async (req, res) => {
  try {
    const leadSubSource = await LeadSubSource.findById(req.params.id).populate(
      "leadSourceId",
      "name code"
    );
    if (!leadSubSource)
      return res.status(404).json({ message: "Lead Sub Source not found" });
    res.json(leadSubSource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a lead sub source
export const updateLeadSubSource = async (req, res) => {
  try {
    const { code, name, leadSourceId, description } = req.body;

    // Validate leadSourceId if provided
    if (leadSourceId && !mongoose.Types.ObjectId.isValid(leadSourceId)) {
      return res.status(400).json({ message: "Invalid Lead Source ID" });
    }

    if (leadSourceId) {
      const leadSource = await LeadSource.findById(leadSourceId);
      if (!leadSource) {
        return res
          .status(400)
          .json({ message: `Lead Source ID ${leadSourceId} does not exist` });
      }
    }

    const leadSubSource = await LeadSubSource.findByIdAndUpdate(
      req.params.id,
      { code, name, leadSourceId, description },
      { new: true, runValidators: true }
    ).populate("leadSourceId", "name code");

    if (!leadSubSource)
      return res.status(404).json({ message: "Lead Sub Source not found" });
    res.json(leadSubSource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a lead sub source
export const deleteLeadSubSource = async (req, res) => {
  try {
    const leadSubSource = await LeadSubSource.findByIdAndDelete(req.params.id);
    if (!leadSubSource)
      return res.status(404).json({ message: "Lead Sub Source not found" });
    res.json({ message: "Lead Sub Source deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
