require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http'); // Import HTTP for Socket.IO
const socketIo = require('socket.io');
const connectDB = require('./config/db');

const app = express();

const server = http.createServer(app); // Create an HTTP server for Socket.IO
const io = socketIo(server); // Initialize Socket.IO with the HTTP server

console.log('Starting server...'); // Debugging line
// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON

// Register routes
console.log('Registering routes...');
app.use('/api/auth', require('./routes/authRoutes'));

// Set up Socket.IO events
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for chat messages
    socket.on('sendMessage', (messageData) => {
        console.log('Received message:', messageData);
        // Broadcast the message to everyone
        io.emit('receiveMessage', messageData);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
