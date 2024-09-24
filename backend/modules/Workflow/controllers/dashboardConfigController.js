//Khushi
//24-09-24
import mongoose from 'mongoose';
import DashboardConfig from '../models/dashboardConfig.js';

export const getDashboardConfigsByUser = async (req, res) => {
  try {
    const dashboardConfigs = await DashboardConfig.find({ user_id: req.params.userId });
    res.status(200).json(dashboardConfigs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard configs', error });
  }
};

export const createDashboardConfig = async (req, res) => {
  const { user_id, widget_type, position, filter_settings } = req.body;

  try {
    const newDashboardConfig = new DashboardConfig({
      user_id,
      widget_type,
      position,
      filter_settings,
    });

    const savedConfig = await newDashboardConfig.save();
    res.status(201).json(savedConfig);
  } catch (error) {
    res.status(500).json({ message: 'Error creating dashboard config', error });
  }
};

export const updateDashboardConfig = async (req, res) => {
  const { widget_type, position, filter_settings } = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedConfig = await DashboardConfig.findByIdAndUpdate(
      id,
      { widget_type, position, filter_settings },
      { new: true }
    );

    if (!updatedConfig) {
      return res.status(404).json({ message: 'Dashboard config not found' });
    }

    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: 'Error updating dashboard config', error });
  }
};

export const deleteDashboardConfig = async (req, res) => {
  try {
    const deletedConfig = await DashboardConfig.findByIdAndDelete(req.params.id);

    if (!deletedConfig) {
      return res.status(404).json({ message: 'Dashboard config not found' });
    }

    res.status(200).json({ message: 'Dashboard config deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dashboard config', error });
  }
};
