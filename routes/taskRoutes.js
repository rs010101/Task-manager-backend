import express from 'express';
import Task from '../models/Task.js';
import { verifyToken } from '../middlewares/validateToken.js';

const router = express.Router();

// POST /tasks - Create a new task
router.post('/tasks', verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({
    title,
    description,
    userId: req.user.id, // Get user ID from the token
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /tasks - Get all tasks for the logged-in user
router.get('/tasks', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /tasks/:id - Get a specific task by ID
router.get('/tasks/:id', verifyToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /tasks/:id - Update a task by ID
router.put('/tasks/:id', verifyToken, async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.id },
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /tasks/:id - Delete a task by ID
router.delete('/tasks/:id', verifyToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;