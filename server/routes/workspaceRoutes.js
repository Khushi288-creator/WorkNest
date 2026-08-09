const express = require('express');
const router = express.Router();
const { createWorkspace, getMyWorkspaces, joinWorkspace } = require('../controllers/workspaceController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createWorkspace);
router.get('/my-workspaces', protect, getMyWorkspaces);
router.post('/join', protect, joinWorkspace);

module.exports = router;