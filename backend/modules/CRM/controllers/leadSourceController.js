import LeadSource from "../models/leadSourceModel.js";

// CREATE a new lead source
export const createLeadSource = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const leadSource = new LeadSource({
      code,
      name,
      description,
    });

    await leadSource.save();
    res.status(201).json(leadSource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all lead sources
export const getLeadSources = async (req, res) => {
  try {
    const leadSources = await LeadSource.find();
    res.json(leadSources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a lead source by ID
export const getLeadSourceById = async (req, res) => {
  try {
    const leadSource = await LeadSource.findById(req.params.id);
    if (!leadSource)
      return res.status(404).json({ message: "Lead source not found" });
    res.json(leadSource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a lead source
export const updateLeadSource = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const leadSource = await LeadSource.findByIdAndUpdate(
      req.params.id,
      { code, name, description },
      { new: true, runValidators: true }
    );

    if (!leadSource)
      return res.status(404).json({ message: "Lead source not found" });
    res.json(leadSource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a lead source
export const deleteLeadSource = async (req, res) => {
  try {
    const leadSource = await LeadSource.findByIdAndDelete(req.params.id);
    if (!leadSource)
      return res.status(404).json({ message: "Lead source not found" });
    res.json({ message: "Lead source deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH lead sources by code or name
export const searchLeadSource = async (req, res) => {
  try {
    const { code, name } = req.query;
    const query = {};

    if (code) {
      query.code = code.toUpperCase();
    }

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    const leadSources = await LeadSource.find(query);
    res.json(leadSources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
