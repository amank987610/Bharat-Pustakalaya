const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load users data
const getUsersData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8');
  return JSON.parse(data);
};

// Get all teachers
router.get('/', (req, res) => {
  try {
    const data = getUsersData();
    const teachers = data.teachers.map(({ password, ...teacher }) => teacher);
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get teacher by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = getUsersData();
    const teacher = data.teachers.find(t => t.id === id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    const { password, ...teacherWithoutPassword } = teacher;
    res.json(teacherWithoutPassword);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
