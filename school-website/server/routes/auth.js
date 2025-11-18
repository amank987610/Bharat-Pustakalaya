const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'school-secret-key-2025';

// Load users data
const getUsersData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8');
  return JSON.parse(data);
};

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const usersData = getUsersData();
    let user = null;

    // Find user based on role
    if (role === 'student') {
      user = usersData.students.find(u => u.email === email);
    } else if (role === 'teacher') {
      user = usersData.teachers.find(u => u.email === email);
    } else if (role === 'admin') {
      user = usersData.admin.find(u => u.email === email);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For demo purposes, accept password "password123" for all users
    // In production, use bcrypt.compare(password, user.password)
    const isValidPassword = password === 'password123';

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token route
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
