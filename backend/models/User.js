const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'offline' }
});

module.exports = mongoose.model('User', userSchema);
