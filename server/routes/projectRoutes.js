const express = require('express');
const router = express.Router();
const { createProject, getProjectsByWorkspace } = require('../controllers/projectController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createProject);
router.get('/workspace/:workspaceId', protect, getProjectsByWorkspace);

module.exports = router;