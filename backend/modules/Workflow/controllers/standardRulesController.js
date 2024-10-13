import StandardRules from '../models/standardRulesModel.js';

// Create a new Standard Rule
export const createStandardRule = async (req, res) => {
  try {
    const standardRule = new StandardRules(req.body);
    await standardRule.save();
    res.status(201).json(standardRule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Standard Rules
export const getStandardRules = async (req, res) => {
  try {
    const standardRules = await StandardRules.find()
      .populate('role')
      .populate('userid')
      .populate('permission');
    res.status(200).json(standardRules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Standard Rule by ID
export const getStandardRuleById = async (req, res) => {
  try {
    const standardRule = await StandardRules.findById(req.params.id)
      .populate('role')
      .populate('userid')
      .populate('permission');
    if (!standardRule) {
      return res.status(404).json({ error: 'Standard Rule not found' });
    }
    res.status(200).json(standardRule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Standard Rule
export const updateStandardRule = async (req, res) => {
  try {
    const standardRule = await StandardRules.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!standardRule) {
      return res.status(404).json({ error: 'Standard Rule not found' });
    }
    res.status(200).json(standardRule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Standard Rule
export const deleteStandardRule = async (req, res) => {
  try {
    const standardRule = await StandardRules.findByIdAndDelete(req.params.id);
    if (!standardRule) {
      return res.status(404).json({ error: 'Standard Rule not found' });
    }
    res.status(200).json({ message: 'Standard Rule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
