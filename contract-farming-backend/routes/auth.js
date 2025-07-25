const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed, role });
  await user.save();
  res.status(201).json({ message: 'Registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Incorrect password' });

  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role, username });
});

module.exports = router;
