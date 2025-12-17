// D:\planit-backend\routes\index.js
const express = require('express');
// Gunakan titik dua (..) untuk MUNDUR satu folder keluar dari 'routes'
const { register, login } = require('../controllers/Auth'); 
const { getTasks, createTask } = require('../controllers/TaskController');

const router = express.Router();

// --- Jalur Auth ---
router.post('/register', register);
router.post('/login', login);

// --- Jalur Tasks ---
router.get('/tasks', getTasks);
router.post('/tasks', createTask);

module.exports = router;