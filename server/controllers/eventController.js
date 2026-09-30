const Event = require('../models/Event');
const Registration = require('../models/Registration');
const mongoose = require('mongoose');

// @desc    Get all events with optional filters (search, category, dateFilter, featured)
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const { search, category, dateFilter, featured } = req.query;
    let query = {};

    // Search by title or description
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { venue: searchRegex },
        { organizer: searchRegex }
      ];
    }

    // Category filter
    if (category && category !== 'All Categories' && category !== 'All') {
      query.category = category;
    }

    // Featured filter
    if (featured === 'true') {
      query.featured = true;
    }

    // Date filter
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (dateFilter === 'upcoming') {
      query.date = { $gte: now };
    } else if (dateFilter === 'past') {
      query.date = { $lt: now };
    }

    const events = await Event.find(query).sort({ date: 1, createdAt: -1 });

    // Calculate dynamic registration count for each event
    const eventsWithCount = await Promise.all(
      events.map(async (event) => {
        const registeredCount = await Registration.countDocuments({ eventId: event._id });
        const eventObj = event.toObject();
        eventObj.registeredCount = registeredCount;
        eventObj.isFull = registeredCount >= event.capacity;
        return eventObj;
      })
    );

    res.status(200).json({
      success: true,
      count: eventsWithCount.length,
      events: eventsWithCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events: ' + error.message
    });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID format'
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const registeredCount = await Registration.countDocuments({ eventId: event._id });
    const eventObj = event.toObject();
    eventObj.registeredCount = registeredCount;
    eventObj.isFull = registeredCount >= event.capacity;

    res.status(200).json({
      success: true,
      event: eventObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event: ' + error.message
    });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      image,
      organizer,
      capacity,
      featured
    } = req.body;

    if (!title || !description || !category || !date || !startTime || !endTime || !venue) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      image: image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      organizer: organizer || 'CampusConnect Team',
      capacity: capacity ? Number(capacity) : 100,
      featured: Boolean(featured)
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create event: ' + error.message
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID format'
      });
    }

    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    const registeredCount = await Registration.countDocuments({ eventId: event._id });
    const eventObj = event.toObject();
    eventObj.registeredCount = registeredCount;
    eventObj.isFull = registeredCount >= event.capacity;

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: eventObj
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update event: ' + error.message
    });
  }
};

// @desc    Delete event and its associated registrations
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID format'
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await Event.findByIdAndDelete(id);
    // Delete all registrations connected to this event
    await Registration.deleteMany({ eventId: id });

    res.status(200).json({
      success: true,
      message: 'Event and associated registrations deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event: ' + error.message
    });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
