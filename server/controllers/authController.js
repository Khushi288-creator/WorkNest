const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
  
    });

    res.status(201).json({      
      message: "User registered successfully", 
      user: { id: newUser._id, name: newUser.name, email: newUser.email } 
    });
  
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });     
  }
};

module.exports = { registerUser };