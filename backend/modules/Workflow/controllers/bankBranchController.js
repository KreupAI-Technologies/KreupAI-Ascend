import BankBranch from "../models/bankBranchModel.js";

export const create = async (req, res) => {
  try {
    const bankBranch = new BankBranch(req.body);
    await bankBranch.save();
    res.status(201).send(bankBranch);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAll = async (req, res) => {
  try {
    const bankBranches = await BankBranch.find();
    res.status(200).send(bankBranches);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getById = async (req, res) => {
  try {
    const bankBranch = await BankBranch.findById(req.params.id);
    if (!bankBranch) return res.status(404).send();
    res.status(200).send(bankBranch);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const update = async (req, res) => {
  try {
    const bankBranch = await BankBranch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bankBranch) return res.status(404).send();
    res.status(200).send(bankBranch);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteById = async (req, res) => {
  try {
    const bankBranch = await BankBranch.findByIdAndDelete(req.params.id);
    if (!bankBranch) return res.status(404).send();
    res.status(200).send({ message: "BankBranch deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
};
