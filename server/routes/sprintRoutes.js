const express = require('express');
const router = express.Router();
const { createSprint, getSprintsByProject } = require('../controllers/sprintController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createSprint);
router.get('/project/:projectId', protect, getSprintsByProject);

module.exports = router;