// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { pool, connectDB } = require('./config/database');
const { createUsersTable } = require('./models/User');
const { createPatientsTable } = require('./models/Patient');

// Import route files
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Set port from environment variable or default to 4000
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/patients', patientRoutes); // Patient-related routes

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Database connection and table creation
const initializeDatabase = async () => {
  try {
    await connectDB(); // Connect to the database
    await createUsersTable(); // Create Users table if not exists
    await createPatientsTable(); // Create Patients table if not exists
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1); // Exit the process if database initialization fails
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Start the server
const startServer = async () => {
  try {
    await initializeDatabase(); // Initialize database before starting the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Optionally, you can decide to crash the application:
  // process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  app.close(() => {
    console.log('Process terminated.');
  });
});

// Start the server
startServer();

module.exports = app; // Export for testing purposes