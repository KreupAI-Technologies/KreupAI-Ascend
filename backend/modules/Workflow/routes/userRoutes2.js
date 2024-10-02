import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
} from "../controllers/user2Controller.js";

const router = express.Router();

router.post("/workflow/users", createUser);
router.get("/workflow/users/:user_id", getUser);
router.put("/workflow/users/:user_id", updateUser);
router.delete("/workflow/users/:user_id", deleteUser);
router.get("/workflow/users", listUsers);

export default router;
