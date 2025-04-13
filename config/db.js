const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully!');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
