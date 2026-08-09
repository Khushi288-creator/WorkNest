const express = require('express');
const router = express.Router();
const { createWorkspace, getMyWorkspaces } = require('../controllers/workspaceController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createWorkspace);
router.get('/my-workspaces', protect, getMyWorkspaces);

module.exports = router;