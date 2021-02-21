const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, default: null },
        password: { type: String, default: null },
        googleId: { type: String, default: null },
        name: { type: String, required: true },
        email: { type: String, default: null },
        group: { type: String, default: '18050202' },
        faculty: { type: String, default: 'Information Technology' },
        avatar: { type: String, default: '/images/default-avt.jpg' },
        userType: { type: String, default: 'student' },
        department: { type: Array, default: [] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);