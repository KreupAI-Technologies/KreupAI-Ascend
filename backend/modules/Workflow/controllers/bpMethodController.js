// /controllers/bpMethodController.js
import BPMethod from '../models/bpmethodModel.js'; //

// Get all BP methods
export const getBPMethods = async (req, res) => {
  try {
    const methods = await BPMethod.find();
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new BPMethod
export const createBPMethod = async (req, res) => {
  const { BPMethod: bpMethodName, description, paymentReceipt } = req.body;

  const method = new BPMethod({
    BPMethod: bpMethodName,
    description,
    paymentReceipt
  });

  try {
    const newMethod = await method.save();
    res.status(201).json(newMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
