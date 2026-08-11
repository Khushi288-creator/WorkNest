const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyEmail } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, (req, res) => {
    res.status(200).json({ message: "You are authenticated!", user: req.user });
});
router.get('/verify/:token', verifyEmail);

module.exports = router;