const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load attendance data
const getAttendanceData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/attendance.json'), 'utf8');
  return JSON.parse(data);
};

// Save attendance data
const saveAttendanceData = (data) => {
  fs.writeFileSync(
    path.join(__dirname, '../data/attendance.json'),
    JSON.stringify(data, null, 2)
  );
};

// Get all attendance records
router.get('/', (req, res) => {
  try {
    const data = getAttendanceData();
    res.json(data.attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance by student ID
router.get('/student/:studentId', (req, res) => {
  try {
    const { studentId } = req.params;
    const data = getAttendanceData();
    const attendance = data.attendance.filter(a => a.studentId === studentId);
    
    if (attendance.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }
    
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance by class
router.get('/class/:className', (req, res) => {
  try {
    const { className } = req.params;
    const data = getAttendanceData();
    const attendance = data.attendance.filter(a => a.class === className);
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching class attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add attendance record
router.post('/', (req, res) => {
  try {
    const newAttendance = req.body;
    const data = getAttendanceData();
    
    // Generate new ID
    const newId = `A${String(data.attendance.length + 1).padStart(3, '0')}`;
    newAttendance.id = newId;
    
    data.attendance.push(newAttendance);
    saveAttendanceData(data);
    
    res.status(201).json({ message: 'Attendance added successfully', attendance: newAttendance });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update attendance record
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttendance = req.body;
    const data = getAttendanceData();
    
    const index = data.attendance.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    data.attendance[index] = { ...data.attendance[index], ...updatedAttendance };
    saveAttendanceData(data);
    
    res.json({ message: 'Attendance updated successfully', attendance: data.attendance[index] });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
