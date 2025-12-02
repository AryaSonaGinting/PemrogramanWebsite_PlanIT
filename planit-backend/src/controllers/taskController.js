// src/controllers/taskController.js
const { sequelize } = require('../config/db');
const Task = sequelize.model('Task'); 

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id }, 
      order: [['createdAt', 'DESC']] 
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      category, // <--- TAMBAHKAN INI
      UserId: req.user.id, 
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    const updatedTask = await task.update(req.body);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};