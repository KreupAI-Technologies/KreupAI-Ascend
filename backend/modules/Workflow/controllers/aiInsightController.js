//Debayan
//21.9.24

import AIInsight from "../models/aiInsightModel.js";

// Create a new AI insight
export const createAIInsight = async (req, res) => {
  const insight = new AIInsight(req.body);
  try {
    const newInsight = await insight.save();
    res.status(201).json(newInsight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all AI insights
export const getAllAIInsights = async (req, res) => {
  try {
    const insights = await AIInsight.find();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single AI insight by ID
export const getAIInsightById = async (req, res) => {
  try {
    const insight = await AIInsight.findById(req.params.id);
    if (!insight) return res.status(404).json({ message: "Insight not found" });
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an AI insight
export const updateAIInsight = async (req, res) => {
  try {
    const updatedInsight = await AIInsight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInsight)
      return res.status(404).json({ message: "Insight not found" });
    res.json(updatedInsight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an AI insight
export const deleteAIInsight = async (req, res) => {
  try {
    const deletedInsight = await AIInsight.findByIdAndDelete(req.params.id);
    if (!deletedInsight)
      return res.status(404).json({ message: "Insight not found" });
    res.json({ message: "Insight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
