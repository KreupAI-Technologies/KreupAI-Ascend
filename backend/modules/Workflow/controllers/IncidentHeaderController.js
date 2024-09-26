import IncidentHeader from '../models/incidentHeader.js';
import User2 from '../models/User2.js';
// import Account from '../models/Account.js';
// import Status from '../models/Status.js';

export const createIncidentHeader = async (req, res, next) => {
  try {
    const {
      incident_process,
      version,
      date,
      description,
      client_id,
      requester,
      creation_user,
      amount,
      from_date,
      to_date,
      division,
      location,
      collection,
      priority,
    } = req.body;

    // Create a new IncidentHeader instance
    const incidentHeader = new IncidentHeader({
      incident_process,
      version,
      date,
      description,
      client_id,
      requester,
      creation_user,
      amount,
      from_date,
      to_date,
      division,
      location,
      collection,
      priority,
    });

    // Save the IncidentHeader to the database
    const createdIncidentHeader = await incidentHeader.save();

    res.status(201).json(createdIncidentHeader);
  } catch (error) {
    // Optionally, you can set the status code based on the error type
    res.status(400);
    next(error); // Pass the error to the error-handling middleware
  }
};


export const getAllIncidentHeaders = async (req, res, next) => {
  try {
    const incidentHeaders = await IncidentHeader.find()
      .populate('client_id', 'name email')          // Adjust fields as per Account model
      .populate('requester', 'name email')          // Adjust fields as per User2 model
      .populate('creation_user', 'name email')      // Adjust fields as per User2 model
      .populate('priority', 'name');                // Adjust fields as per Status model

    res.status(200).json(incidentHeaders);
  } catch (error) {
    console.error('Error fetching Incident Headers:', error);
    res.status(500);
    next(error);
  }
};


export const getIncidentHeaderById = async (req, res, next) => {
  try {
    const incidentHeader = await IncidentHeader.findById(req.params.id)
      .populate('client_id', 'name email')          // Adjust fields as per Account model
      .populate('requester', 'name email')          // Adjust fields as per User2 model
      .populate('creation_user', 'name email')      // Adjust fields as per User2 model
      .populate('priority', 'name');                // Adjust fields as per Status model

    if (!incidentHeader) {
      res.status(404);
      return next(new Error('Incident Header not found'));
    }

    res.status(200).json(incidentHeader);
  } catch (error) {
    console.error(`Error fetching Incident Header with ID ${req.params.id}:`, error);
    res.status(500);
    next(error);
  }
};


export const updateIncidentHeader = async (req, res, next) => {
  try {
    const {
      incident_process,
      version,
      date,
      description,
      client_id,
      requester,
      creation_user,
      amount,
      from_date,
      to_date,
      division,
      location,
      collection,
      priority,
    } = req.body;

    // Find the IncidentHeader by ID
    const incidentHeader = await IncidentHeader.findById(req.params.id);

    if (!incidentHeader) {
      res.status(404);
      return next(new Error('Incident Header not found'));
    }

    // Update fields if provided
    incidentHeader.incident_process = incident_process || incidentHeader.incident_process;
    incidentHeader.version = version || incidentHeader.version;
    incidentHeader.date = date || incidentHeader.date;
    incidentHeader.description = description || incidentHeader.description;
    incidentHeader.client_id = client_id || incidentHeader.client_id;
    incidentHeader.requester = requester || incidentHeader.requester;
    incidentHeader.creation_user = creation_user || incidentHeader.creation_user;
    incidentHeader.amount = amount !== undefined ? amount : incidentHeader.amount;
    incidentHeader.from_date = from_date || incidentHeader.from_date;
    incidentHeader.to_date = to_date || incidentHeader.to_date;
    incidentHeader.division = division || incidentHeader.division;
    incidentHeader.location = location || incidentHeader.location;
    incidentHeader.collection = collection || incidentHeader.collection;
    incidentHeader.priority = priority || incidentHeader.priority;
    incidentHeader.modifiedAt = Date.now();

    // Save the updated IncidentHeader
    const updatedIncidentHeader = await incidentHeader.save();

    res.status(200).json(updatedIncidentHeader);
  } catch (error) {
    console.error(`Error updating Incident Header with ID ${req.params.id}:`, error);
    res.status(400);
    next(error);
  }
};


export const deleteIncidentHeader = async (req, res, next) => {
  try {
    const incidentHeader = await IncidentHeader.findById(req.params.id);

    if (!incidentHeader) {
      res.status(404);
      return next(new Error('Incident Header not found'));
    }

    await incidentHeader.remove();

    res.status(200).json({ message: 'Incident Header deleted successfully' });
  } catch (error) {
    console.error(`Error deleting Incident Header with ID ${req.params.id}:`, error);
    res.status(500);
    next(error);
  }
};