import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from "../controllers/bankAccountController.js";

const router = express.Router();

router.post("/bankAccount", create);
router.get("/bankAccount", getAll);
router.get("/bankAccount/:id", getById);
router.put("/bankAccount/:id", update);
router.delete("/bankAccount/:id", deleteById);

export default router;
