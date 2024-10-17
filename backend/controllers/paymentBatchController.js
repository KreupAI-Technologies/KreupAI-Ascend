// controllers/paymentBatchController.js
import PaymentBatch from '../models/PaymentBatch.js';


// Get all payment batches
export const getPaymentBatches = async (req, res) => {
  try {
    const batches = await PaymentBatch.find();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single payment batch by ID
export const getPaymentBatchById = async (req, res) => {
  try {
    const batch = await PaymentBatch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Payment batch not found' });
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new payment batch
export const createPaymentBatch = async (req, res) => {
  const { PBCode, Status, ChequeNo, BankCode } = req.body;

  const newBatch = new PaymentBatch({
    PBCode,
    Status,
    ChequeNo,
    BankCode,
  });

  try {
    const savedBatch = await newBatch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a payment batch by ID
export const updatePaymentBatch = async (req, res) => {
  try {
    const updatedBatch = await PaymentBatch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBatch) return res.status(404).json({ message: 'Payment batch not found' });

    res.json(updatedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment batch by ID
export const deletePaymentBatch = async (req, res) => {
  try {
    const batch = await PaymentBatch.findByIdAndDelete(req.params.id);

    if (!batch) return res.status(404).json({ message: 'Payment batch not found' });

    res.json({ message: 'Payment batch deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
