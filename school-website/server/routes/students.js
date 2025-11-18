const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load users data
const getUsersData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf8');
  return JSON.parse(data);
};

// Get all students
router.get('/', (req, res) => {
  try {
    const data = getUsersData();
    const students = data.students.map(({ password, ...student }) => student);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = getUsersData();
    const student = data.students.find(s => s.id === id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const { password, ...studentWithoutPassword } = student;
    res.json(studentWithoutPassword);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
