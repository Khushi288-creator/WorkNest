const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createTask);
router.get('/project/:projectId', protect, getTasksByProject);

module.exports = router;