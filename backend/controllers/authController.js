const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
console.log('User model:', User);

// Register User
exports.register = async (req, res) => {
    console.log('Register function called'); // Debugging line
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        console.log('Checking if user exists...');
        let user = await User.findOne({ username });
        if (user){
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        console.log('User not found, proceeding with password hashing...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        console.log('Creating new user in the database...');
        user = new User({ username, password: hashedPassword });
        await user.save();

        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in register function:', error); // Detailed error log
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
exports.login = async (req, res) => {
    console.log('Login function called'); // Debugging line
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
