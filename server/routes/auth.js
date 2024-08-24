const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

<<<<<<< HEAD

=======
// register
>>>>>>> 60449b938945037bc0f06174e9ddd4e231f5f390
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!['admin', 'employee'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

<<<<<<< HEAD
    // Hash password and create new user
=======
>>>>>>> 60449b938945037bc0f06174e9ddd4e231f5f390
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
