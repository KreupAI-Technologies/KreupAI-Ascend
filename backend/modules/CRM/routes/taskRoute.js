// backend/routes/tasks.routes.js

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateTask,
    validateUpdateTask,
} from "../../../utils/taskValidator.js";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Create a new Task
router.post(
    "/tasks",
    cookieAuthMiddleware,
    validateCreateTask,
    createTask
);

// Get all Tasks
router.get("/tasks", cookieAuthMiddleware, getTasks);

// Get a Task by ID
router.get("/tasks/:id", cookieAuthMiddleware, getTaskById);

// Update a Task
router.put(
    "/tasks/:id",
    cookieAuthMiddleware,
    validateUpdateTask,
    updateTask
);

// Delete a Task
router.delete("/tasks/:id", cookieAuthMiddleware, deleteTask);

export default router;
