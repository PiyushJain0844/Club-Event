const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required']
  },
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  year: {
    type: String,
    required: [true, 'Academic year / stream is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a student cannot register twice for the same event with the same email
registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
