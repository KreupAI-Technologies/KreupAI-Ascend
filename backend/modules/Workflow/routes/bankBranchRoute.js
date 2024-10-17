import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from "../controllers/bankBranchController.js";

const router = express.Router();

router.post("/bankBranch", create);
router.get("/bankBranch", getAll);
router.get("/bankBranch/:id", getById);
router.put("/bankBranch/:id", update);
router.delete("/bankBranch/:id", deleteById);

export default router;
