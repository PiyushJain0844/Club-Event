const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusconnect';
    
    // Attempt connecting to configured MONGO_URI with short selection timeout
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 3000
      });
      console.log(`MongoDB Connected (External/Local): ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn('Local/Configured MongoDB connection failed or not available:', err.message);
      console.log('Starting internal MongoMemoryServer fallback...');
      
      mongoMemoryServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoMemoryServer.getUri();
      
      const conn = await mongoose.connect(inMemoryUri);
      console.log(`MongoDB Connected (In-Memory Fallback): ${conn.connection.host}`);
      return conn;
    }
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
