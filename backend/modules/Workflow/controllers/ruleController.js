import Rule from "../models/ruleModel.js";

// Create a new rule
export const createRule = async (req, res) => {
  try {
    const newRule = new Rule(req.body);
    const savedRule = await newRule.save();
    res.status(201).json(savedRule);
  } catch (error) {
    res.status(400).json({ message: "Error creating rule", error });
  }
};

// Get all rules
export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find().populate("created_by last_modified_by");
    res.status(200).json(rules);
  } catch (error) {
    res.status(400).json({ message: "Error fetching rules", error });
  }
};

// Get a single rule by ID
export const getRuleById = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id).populate(
      "created_by last_modified_by"
    );
    if (!rule) return res.status(404).json({ message: "Rule not found" });
    res.status(200).json(rule);
  } catch (error) {
    res.status(400).json({ message: "Error fetching rule", error });
  }
};

// Update a rule by ID
export const updateRule = async (req, res) => {
  try {
    const updatedRule = await Rule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRule)
      return res.status(404).json({ message: "Rule not found" });
    res.status(200).json(updatedRule);
  } catch (error) {
    res.status(400).json({ message: "Error updating rule", error });
  }
};

// Delete a rule by ID
export const deleteRule = async (req, res) => {
  try {
    const deletedRule = await Rule.findByIdAndDelete(req.params.id);
    if (!deletedRule)
      return res.status(404).json({ message: "Rule not found" });
    res.status(200).json({ message: "Rule deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting rule", error });
  }
};
