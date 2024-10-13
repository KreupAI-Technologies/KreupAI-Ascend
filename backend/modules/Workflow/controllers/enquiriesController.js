import Enquiries from '../models/enquiriesModel.js';

// Create a new Enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiries(req.body);
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Enquiries (optionally by incident_id)
export const getEnquiries = async (req, res) => {
  try {
    const filter = {};
    if (req.query.incident_id) {
      filter.incident_id = req.query.incident_id;
    }
    const enquiries = await Enquiries.find(filter)
      .populate('incident_id')
      .populate('parent_id')
      .populate('Enquiry_to');
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiries.findById(req.params.id)
      .populate('incident_id')
      .populate('parent_id')
      .populate('Enquiry_to');
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an Enquiry
export const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiries.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiries.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
