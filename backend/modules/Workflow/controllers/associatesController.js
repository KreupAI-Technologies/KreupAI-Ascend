import Associates from '../KreupAI-Ascend/backend/models/Associates.js';

// Create a new Association
export const createAssociate = async (req, res) => {
  try {
    const associate = new Associates(req.body);
    await associate.save();
    res.status(201).json(associate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Associations
export const getAssociates = async (req, res) => {
  try {
    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const associates = await Associates.find(filter)
      .populate('user_id')
      .populate('associate_id');
    res.status(200).json(associates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Association by ID
export const getAssociateById = async (req, res) => {
  try {
    const associate = await Associates.findById(req.params.id)
      .populate('user_id')
      .populate('associate_id');
    if (!associate) {
      return res.status(404).json({ error: 'Association not found' });
    }
    res.status(200).json(associate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an Association
export const deleteAssociate = async (req, res) => {
  try {
    const associate = await Associates.findByIdAndDelete(req.params.id);
    if (!associate) {
      return res.status(404).json({ error: 'Association not found' });
    }
    res.status(200).json({ message: 'Association deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
