const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

dotenv.config();

const sampleEvents = [
  {
    title: 'CodeFest 2026',
    description: 'The ultimate competitive programming challenge for tech enthusiasts across colleges. Test your algorithms, data structures, and problem-solving skills against top student coders. Prizes worth ₹50,000!',
    category: 'Technical',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    venue: 'Computer Science Complex, Main Auditorium',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    organizer: 'Coding & Algorithmic Society',
    capacity: 120,
    featured: true
  },
  {
    title: 'Hackathon 2026: Build For Tomorrow',
    description: 'A 24-hour non-stop innovation marathon. Teams will design, develop, and prototype real-world solutions for sustainability, healthcare, and smart education with mentorship from industry leaders.',
    category: 'Competition',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    startTime: '10:00 AM',
    endTime: '10:00 AM (Next Day)',
    venue: 'Innovation Hub & Design Lab',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
    organizer: 'Developers Student Club',
    capacity: 150,
    featured: true
  },
  {
    title: 'Battle of Bands - Campus Musical Clash',
    description: 'The loudest rock and fusion band competition of the year! College bands face off on the central amphitheater stage. Bring your energy and cheer for your favorite college performers.',
    category: 'Cultural',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    startTime: '05:00 PM',
    endTime: '09:30 PM',
    venue: 'Central Open Amphitheatre',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    organizer: 'Music & Fine Arts Club',
    capacity: 300,
    featured: false
  },
  {
    title: 'AI & Future Technologies Masterclass',
    description: 'An interactive hands-on workshop on generative AI, LLMs, prompt engineering, and machine learning deployment in modern web applications. Laptops required.',
    category: 'Workshop',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    startTime: '11:00 AM',
    endTime: '03:00 PM',
    venue: 'Seminar Hall 3, Tech Block B',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    organizer: 'AI & Robotics Research Lab',
    capacity: 80,
    featured: false
  },
  {
    title: 'Startup Sprint: Pitch Deck Challenge',
    description: 'Got an innovative business idea? Present your startup pitch deck to venture capitalists, angel investors, and experienced alumni mentors. Win seed funding and incubator space.',
    category: 'Entrepreneurship',
    date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // 18 days from now
    startTime: '01:00 PM',
    endTime: '06:00 PM',
    venue: 'E-Cell Conference Room',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    organizer: 'Entrepreneurship Cell (E-Cell)',
    capacity: 60,
    featured: true
  },
  {
    title: 'Inter-College Chess Championship',
    description: 'Rapid and blitz chess tournament adhering to FIDE guidelines. Open to undergraduate and postgraduate students from all registered universities.',
    category: 'Sports',
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    venue: 'Indoor Sports Complex, Hall 2',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
    organizer: 'Campus Sports Association',
    capacity: 64,
    featured: false
  }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Event.deleteMany({});
    await Registration.deleteMany({});

    console.log('Inserting sample events...');
    const createdEvents = await Event.insertMany(sampleEvents);

    console.log('Creating sample registrations...');
    const sampleRegistrations = [
      {
        eventId: createdEvents[0]._id,
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        college: 'National Institute of Technology',
        year: 'B.Tech CSE 3rd Year',
        phone: '9876543210'
      },
      {
        eventId: createdEvents[0]._id,
        name: 'Priya Verma',
        email: 'priya.verma@example.com',
        college: 'College of Engineering & Tech',
        year: 'B.Tech IT 2nd Year',
        phone: '9812345678'
      },
      {
        eventId: createdEvents[1]._id,
        name: 'Rohan Gupta',
        email: 'rohan.gupta@example.com',
        college: 'City University of Science',
        year: 'B.Tech ECE 4th Year',
        phone: '9765432109'
      },
      {
        eventId: createdEvents[3]._id,
        name: 'Ananya Patel',
        email: 'ananya.patel@example.com',
        college: 'St. Xavier Institute',
        year: 'B.Sc Data Science 2nd Year',
        phone: '9901234567'
      }
    ];

    await Registration.insertMany(sampleRegistrations);

    console.log('Database successfully seeded with realistic sample events and registrations!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
