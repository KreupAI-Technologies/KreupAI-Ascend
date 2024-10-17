import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from "../controllers/cashTypeController.js";

const router = express.Router();

router.post("/cashType", create);
router.get("/cashType", getAll);
router.get("/cashType/:id", getById);
router.put("/cashType/:id", update);
router.delete("/cashType/:id", deleteById);

export default router;
