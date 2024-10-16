import express from 'express';
import { createEnquiry, getEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry } from '../controllers/enquiriesController.js';

const router = express.Router();

// Create a new Enquiry
router.post('/enquiries', createEnquiry);

// Get all Enquiries (optionally by incident_id)
router.get('/enquiries', getEnquiries);

// Get a single Enquiry by ID
router.get('/enquiries/:id', getEnquiryById);

// Update an Enquiry
router.put('/enquiries/:id', updateEnquiry);

// Delete an Enquiry
router.delete('/enquiries/:id', deleteEnquiry);

export default router;
