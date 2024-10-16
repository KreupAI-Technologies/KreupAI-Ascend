import Task from "../models/taskModel.js";
import { validationResult } from "express-validator";

// Create a new Task
export const createTask = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const taskData = req.body;
        taskData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

        // Create a new Task instance
        const task = new Task(taskData);
        await task.save();

        // Populate references for the response
        await task
            .populate('priorityId', 'name')
            .populate('collectionTypeId', 'name')
            .populate('userId', 'firstName lastName username')
            .populate('statusId', 'name')
            .populate('createdBy', 'firstName lastName username')
            .execPopulate();

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all Tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('priorityId', 'name')
            .populate('collectionTypeId', 'name')
            .populate('userId', 'firstName lastName username')
            .populate('statusId', 'name')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a Task By Id
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('priorityId', 'name')
            .populate('collectionTypeId', 'name')
            .populate('userId', 'firstName lastName username')
            .populate('statusId', 'name')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a Task
export const updateTask = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updates = req.body;
        updates.modifiedBy = req.user.userId;
        updates.modifiedDate = new Date();

        const task = await Task.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        })
            .populate('priorityId', 'name')
            .populate('collectionTypeId', 'name')
            .populate('userId', 'firstName lastName username')
            .populate('statusId', 'name')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a Task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}