import crmDivision from "../models/crmDivision.js";

// CREATE a new division
export const createDivision = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const division = new crmDivision({
      code,
      name,
      description,
    });

    await division.save();
    res.status(201).json(division);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all divisions
export const getAllDivision = async (req, res) => {
  try {
    const divisions = await crmDivision.find();
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a division by ID
export const getDivision = async (req, res) => {
  try {
    const division = await crmDivision.findById(req.params.id);
    if (!division)
      return res.status(404).json({ message: "Division not found" });
    res.json(division);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a division
export const updateDivision = async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const division = await crmDivision.findByIdAndUpdate(
      req.params.id,
      { code, name, description },
      { new: true, runValidators: true }
    );

    if (!division)
      return res.status(404).json({ message: "Division not found" });
    res.json(division);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a division
export const deleteDivision = async (req, res) => {
  try {
    const division = await crmDivision.findByIdAndDelete(req.params.id);
    if (!division)
      return res.status(404).json({ message: "Division not found" });
    res.json({ message: "Division deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH divisions by code or name
export const searchDivision = async (req, res) => {
  try {
    const { code, name } = req.query;
    const divisions = await crmDivision.find({
      code: new RegExp(code, "i"),
      name: new RegExp(name, "i"),
    });
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
