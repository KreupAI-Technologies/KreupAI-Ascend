import CashType from "../models/cashTypeModel.js";

export const create = async (req, res) => {
  try {
    const cashType = new CashType(req.body);
    await cashType.save();
    res.status(201).send(cashType);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAll = async (req, res) => {
  try {
    const cashTypes = await CashType.find();
    res.status(200).send(cashTypes);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getById = async (req, res) => {
  try {
    const cashType = await CashType.findById(req.params.id);
    if (!cashType) return res.status(404).send();
    res.status(200).send(cashType);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const update = async (req, res) => {
  try {
    const cashType = await CashType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cashType) return res.status(404).send();
    res.status(200).send(cashType);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteById = async (req, res) => {
  try {
    const cashType = await CashType.findByIdAndDelete(req.params.id);
    if (!cashType) return res.status(404).send();
    res.status(200).send({ message: "CashType deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
};
