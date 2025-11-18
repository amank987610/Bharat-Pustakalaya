const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load notices data
const getNoticesData = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/notices.json'), 'utf8');
  return JSON.parse(data);
};

// Save notices data
const saveNoticesData = (data) => {
  fs.writeFileSync(
    path.join(__dirname, '../data/notices.json'),
    JSON.stringify(data, null, 2)
  );
};

// Get all active notices
router.get('/', (req, res) => {
  try {
    const data = getNoticesData();
    const currentDate = new Date();
    
    // Filter out expired notices
    const activeNotices = data.notices.filter(notice => {
      const expiryDate = new Date(notice.expiryDate);
      return expiryDate >= currentDate;
    });
    
    // Sort by date (newest first)
    activeNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json(activeNotices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notice by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = getNoticesData();
    const notice = data.notices.find(n => n.id === id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    res.json(notice);
  } catch (error) {
    console.error('Error fetching notice:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new notice
router.post('/', (req, res) => {
  try {
    const newNotice = req.body;
    const data = getNoticesData();
    
    // Generate new ID
    const newId = `N${String(data.notices.length + 1).padStart(3, '0')}`;
    newNotice.id = newId;
    newNotice.date = new Date().toISOString().split('T')[0];
    
    data.notices.push(newNotice);
    saveNoticesData(data);
    
    res.status(201).json({ message: 'Notice added successfully', notice: newNotice });
  } catch (error) {
    console.error('Error adding notice:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update notice
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotice = req.body;
    const data = getNoticesData();
    
    const index = data.notices.findIndex(n => n.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    data.notices[index] = { ...data.notices[index], ...updatedNotice };
    saveNoticesData(data);
    
    res.json({ message: 'Notice updated successfully', notice: data.notices[index] });
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete notice
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = getNoticesData();
    
    const index = data.notices.findIndex(n => n.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    data.notices.splice(index, 1);
    saveNoticesData(data);
    
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
