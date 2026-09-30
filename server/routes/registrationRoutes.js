const express = require('express');
const router = express.Router();
const {
  registerStudent,
  getAllRegistrations,
  getRegistrationsByEvent,
  deleteRegistration
} = require('../controllers/registrationController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', registerStudent);
router.get('/', protectAdmin, getAllRegistrations);
router.get('/event/:eventId', getRegistrationsByEvent);
router.delete('/:id', protectAdmin, deleteRegistration);

module.exports = router;
