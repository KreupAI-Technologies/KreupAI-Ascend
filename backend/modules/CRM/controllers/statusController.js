import Status from "../models/statusModel.js";

// CREATE a new status
export const createStatus = async (req, res) => {
  try {
    const { statusGroup, statusDescription } = req.body;

    const status = new Status({
      statusGroup,
      statusDescription,
    });

    await status.save();
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all statuses
export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ statuses by status group
export const getStatusesByStatusGroup = async (req, res) => {
  try {
    const statusGroup = req.params.statusGroup.toUpperCase();
    const statuses = await Status.find({ statusGroup });
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a status by ID
export const getStatusById = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) return res.status(404).json({ message: "Status not found" });
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a status
export const updateStatus = async (req, res) => {
  try {
    const { statusGroup, statusDescription } = req.body;

    const status = await Status.findByIdAndUpdate(
      req.params.id,
      { statusGroup, statusDescription },
      { new: true, runValidators: true }
    );

    if (!status) return res.status(404).json({ message: "Status not found" });
    res.json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a status
export const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndDelete(req.params.id);
    if (!status) return res.status(404).json({ message: "Status not found" });
    res.json({ message: "Status deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH statuses by status group or description
export const searchStatuses = async (req, res) => {
  try {
    const { statusGroup, statusDescription } = req.query;
    const query = {};

    if (statusGroup) {
      query.statusGroup = statusGroup.toUpperCase();
    }

    if (statusDescription) {
      query.statusDescription = { $regex: statusDescription, $options: "i" };
    }

    const statuses = await Status.find(query);
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
