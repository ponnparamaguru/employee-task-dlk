// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Ensure this model exists
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // Middleware for authentication
const adminMiddleware = require('../middleware/admin'); // Middleware for admin authorization

router.get('/tasks/employee/me', authMiddleware, async (req, res) => {
    try {
      const employeeId = req.user.id; // Get employee ID from authenticated user
      const tasks = await Task.find({ assignedTo: employeeId });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
// Assign a task to an employee
router.post('/tasks/assign', async (req, res) => {
  try {
    const { title, description, employeeId } = req.body;

    // Validate input
    if (!title || !description || !employeeId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if employee exists
    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== 'employee') {
      return res.status(400).json({ message: 'Invalid employee' });
    }

    // Create and save the task
    const newTask = new Task({ title, description, assignedTo: employeeId });
    await newTask.save();
    res.status(201).json({ message: 'Task assigned successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task by ID
router.patch('/tasks/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Find and update the task
      const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/tasks/admin', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'username');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update time spent on a task (for employees)
  router.patch('/tasks/update/:id/time', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { timeSpent } = req.body; // Time spent in minutes
  
      const updatedTask = await Task.findByIdAndUpdate(id, { timeSpent }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'username');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
