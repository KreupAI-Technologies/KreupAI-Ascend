import BankAccount from "../models/bankAccountModel.js";

export const create = async (req, res) => {
  try {
    const bankAccount = new BankAccount(req.body);
    await bankAccount.save();
    res.status(201).send(bankAccount);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAll = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find();
    res.status(200).send(bankAccounts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getById = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    if (!bankAccount) return res.status(404).send();
    res.status(200).send(bankAccount);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const update = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bankAccount) return res.status(404).send();
    res.status(200).send(bankAccount);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteById = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findByIdAndDelete(req.params.id);
    if (!bankAccount) return res.status(404).send();
    res.status(200).send({ message: "BankAccount deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
};
