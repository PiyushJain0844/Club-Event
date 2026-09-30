const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminStats } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/stats', protectAdmin, getAdminStats);

module.exports = router;
