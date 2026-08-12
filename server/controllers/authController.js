const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(2, 15);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken  
    });

    const verifyLink = `${process.env.SERVER_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your WorkNest account",
      `<p>Hi ${name},</p><p>Please click the link below to verify your account:</p><a href="${verifyLink}">${verifyLink}</a>`
    );

    res.status(201).json({      
      message: "User registered successfully", 
      user: { id: newUser._id, name: newUser.name, email: newUser.email } 
    });
  
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });     
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {      
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {      
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully! You can now log in." });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No user found with this email" });
    }

    const resetToken = Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = resetToken;
    await user.save();

   const resetLink = `${process.env.SERVER_URL}/api/auth/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Reset your WorkNest password",
      `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};  

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now log in with your new password." });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: req.file.path },
      { new: true }
    );

    res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: user.avatar
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword, uploadAvatar };