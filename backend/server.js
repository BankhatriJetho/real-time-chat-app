require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');

const app = express();

console.log('Starting server...'); // Debugging line
// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON

// Register routes
console.log('Registering routes...');
app.use('/api/auth', require('./routes/authRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
