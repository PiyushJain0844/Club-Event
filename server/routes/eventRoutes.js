const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', protectAdmin, createEvent);
router.put('/:id', protectAdmin, updateEvent);
router.delete('/:id', protectAdmin, deleteEvent);

module.exports = router;
