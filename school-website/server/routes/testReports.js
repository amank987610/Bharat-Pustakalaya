const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load test reports data
const getTestReportsData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/testReports.json'), 'utf8');
  return JSON.parse(data);
};

// Save test reports data
const saveTestReportsData = (data) => {
  fs.writeFileSync(
    path.join(__dirname, '../data/testReports.json'),
    JSON.stringify(data, null, 2)
  );
};

// Get all test reports
router.get('/', (req, res) => {
  try {
    const data = getTestReportsData();
    res.json(data.reports);
  } catch (error) {
    console.error('Error fetching test reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test report by student ID
router.get('/student/:studentId', (req, res) => {
  try {
    const { studentId } = req.params;
    const data = getTestReportsData();
    const reports = data.reports.filter(r => r.studentId === studentId);
    
    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this student' });
    }
    
    res.json(reports);
  } catch (error) {
    console.error('Error fetching student report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test report by class
router.get('/class/:className', (req, res) => {
  try {
    const { className } = req.params;
    const data = getTestReportsData();
    const reports = data.reports.filter(r => r.class === className);
    res.json(reports);
  } catch (error) {
    console.error('Error fetching class reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new test report
router.post('/', (req, res) => {
  try {
    const newReport = req.body;
    const data = getTestReportsData();
    
    // Generate new ID
    const newId = `R${String(data.reports.length + 1).padStart(3, '0')}`;
    newReport.id = newId;
    
    data.reports.push(newReport);
    saveTestReportsData(data);
    
    res.status(201).json({ message: 'Report added successfully', report: newReport });
  } catch (error) {
    console.error('Error adding report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update test report
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedReport = req.body;
    const data = getTestReportsData();
    
    const index = data.reports.findIndex(r => r.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    data.reports[index] = { ...data.reports[index], ...updatedReport };
    saveTestReportsData(data);
    
    res.json({ message: 'Report updated successfully', report: data.reports[index] });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
