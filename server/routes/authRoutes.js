const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword, uploadAvatar } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, (req, res) => {
    res.status(200).json({ message: "You are authenticated!", user: req.user });
});
router.get('/verify/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);

module.exports = router;