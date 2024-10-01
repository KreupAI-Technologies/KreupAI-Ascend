import express from 'express';
import { createEnquiry, getEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry } from '../../../controllers/enquiriesController.js';

const router = express.Router();

// Create a new Enquiry
router.post('/', createEnquiry);

// Get all Enquiries (optionally by incident_id)
router.get('/', getEnquiries);

// Get a single Enquiry by ID
router.get('/:id', getEnquiryById);

// Update an Enquiry
router.put('/:id', updateEnquiry);

// Delete an Enquiry
router.delete('/:id', deleteEnquiry);

export default router;
