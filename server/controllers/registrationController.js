const Registration = require('../models/Registration');
const Event = require('../models/Event');
const mongoose = require('mongoose');

// @desc    Register a student for an event
// @route   POST /api/registrations
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const { eventId, name, email, college, year, phone } = req.body;

    // Validate required fields
    if (!eventId || !name || !email || !college || !year || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required registration fields.'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID provided.'
      });
    }

    // Verify Event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.'
      });
    }

    // Check Capacity Limit
    const registeredCount = await Registration.countDocuments({ eventId });
    if (registeredCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Registration is full for this event.'
      });
    }

    // Prevent duplicate registration for the same event and email
    const normalizedEmail = email.trim().toLowerCase();
    const existingRegistration = await Registration.findOne({
      eventId,
      email: normalizedEmail
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for this event.'
      });
    }

    // Create registration record
    const registration = await Registration.create({
      eventId,
      name: name.trim(),
      email: normalizedEmail,
      college: college.trim(),
      year: year.trim(),
      phone: phone.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! We look forward to seeing you at the event.',
      registration
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for this event.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to complete registration: ' + error.message
    });
  }
};

// @desc    Get all registrations with search & event filter
// @route   GET /api/registrations
// @access  Private (Admin)
const getAllRegistrations = async (req, res) => {
  try {
    const { search, eventId } = req.query;
    let query = {};

    if (eventId && mongoose.Types.ObjectId.isValid(eventId)) {
      query.eventId = eventId;
    }

    let registrations = await Registration.find(query)
      .populate('eventId', 'title date category venue')
      .sort({ registeredAt: -1 });

    // Client search filtering by student name, email, college, or event title
    if (search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      registrations = registrations.filter((reg) => {
        const studentName = reg.name ? reg.name.toLowerCase() : '';
        const email = reg.email ? reg.email.toLowerCase() : '';
        const college = reg.college ? reg.college.toLowerCase() : '';
        const eventTitle = reg.eventId && reg.eventId.title ? reg.eventId.title.toLowerCase() : '';

        return (
          studentName.includes(term) ||
          email.includes(term) ||
          college.includes(term) ||
          eventTitle.includes(term)
        );
      });
    }

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations: ' + error.message
    });
  }
};

// @desc    Get registrations for a specific event
// @route   GET /api/registrations/event/:eventId
// @access  Public / Admin
const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID format'
      });
    }

    const registrations = await Registration.find({ eventId })
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event registrations: ' + error.message
    });
  }
};

// @desc    Delete a registration
// @route   DELETE /api/registrations/:id
// @access  Private (Admin)
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Registration ID format'
      });
    }

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration record not found'
      });
    }

    await Registration.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration: ' + error.message
    });
  }
};

module.exports = {
  registerStudent,
  getAllRegistrations,
  getRegistrationsByEvent,
  deleteRegistration
};
