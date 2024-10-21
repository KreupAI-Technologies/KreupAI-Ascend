// controllers/paymentDetailsController.js
import PaymentDetails from '../models/paymentDetails.js';
import ACRDetails from '../models/ACRDetails.js';  // Import ACRDetails model
import Account from '../models/Account.js';  

// Create a new PaymentDetails entry
export const createPaymentDetails = async (req, res) => {
  const paymentDetailsData = req.body;

  try {
    const paymentDetails = new PaymentDetails(paymentDetailsData);
    await paymentDetails.save();
    res.status(201).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all PaymentDetails entries
export const getAllPaymentDetails = async (req, res) => {
  try {
    const paymentDetails = await PaymentDetails.find();
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch PaymentDetails by ID
export const getPaymentDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const paymentDetails = await PaymentDetails.findById(id);
    if (!paymentDetails) {
      return res.status(404).json({ message: 'PaymentDetails not found' });
    }
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update PaymentDetails
export const updatePaymentDetails = async (req, res) => {
  const { id } = req.params;
  const paymentDetailsData = req.body;

  try {
    const paymentDetails = await PaymentDetails.findByIdAndUpdate(id, paymentDetailsData, { new: true });
    if (!paymentDetails) {
      return res.status(404).json({ message: 'PaymentDetails not found' });
    }
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete PaymentDetails
export const deletePaymentDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const paymentDetails = await PaymentDetails.findByIdAndDelete(id);
    if (!paymentDetails) {
      return res.status(404).json({ message: 'PaymentDetails not found' });
    }
    res.status(200).json({ message: 'PaymentDetails deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
