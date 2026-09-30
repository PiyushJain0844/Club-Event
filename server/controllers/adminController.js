const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@campusconnect.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.'
      });
    }

    const token = jwt.sign(
      { email: adminEmail, isAdmin: true },
      process.env.JWT_SECRET || 'campusconnect_super_secret_jwt_key_2026',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: {
        email: adminEmail,
        role: 'admin'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error during admin authentication: ' + error.message
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getAdminStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const featuredEvents = await Event.countDocuments({ featured: true });
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const upcomingEvents = await Event.countDocuments({ date: { $gte: now } });
    
    const totalRegistrations = await Registration.countDocuments();

    // Fetch recent registrations with populated event titles
    const recentRegistrations = await Registration.find()
      .populate('eventId', 'title date venue category')
      .sort({ registeredAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalEvents,
        upcomingEvents,
        totalRegistrations,
        featuredEvents
      },
      recentRegistrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching dashboard stats: ' + error.message
    });
  }
};

module.exports = {
  loginAdmin,
  getAdminStats
};
