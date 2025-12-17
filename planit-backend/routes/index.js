// D:\planit-backend\routes\index.js
const express = require('express');
// Gunakan titik dua (..) untuk MUNDUR satu folder keluar dari 'routes'
const { register, login } = require('../controllers/Auth'); 
const { getTasks, createTask } = require('../controllers/TaskController');

const router = express.Router();

// --- Jalur Auth ---
router.post('/register', register);
router.post('/login', login);

router.get('/tasks/:userId', getTasks);
router.post('/tasks', createTasks);

module.exports = router;