import Industry from "../models/industryModel.js";

// CREATE a new industry
export const createIndustry = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const industry = new Industry({
      code,
      name,
      description,
    });

    await industry.save();
    res.status(201).json(industry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all industries
export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ an industry by ID
export const getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry)
      return res.status(404).json({ message: "Industry not found" });
    res.json(industry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an industry
export const updateIndustry = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const industry = await Industry.findByIdAndUpdate(
      req.params.id,
      { code, name, description },
      { new: true, runValidators: true }
    );

    if (!industry)
      return res.status(404).json({ message: "Industry not found" });
    res.json(industry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an industry
export const deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry)
      return res.status(404).json({ message: "Industry not found" });
    res.json({ message: "Industry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH for industries by name / Code
export const searchIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({
      $or: [
        { name: { $regex: req.params.searchText, $options: "i" } },
        { code: { $regex: req.params.searchText, $options: "i" } },
      ],
    });
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
