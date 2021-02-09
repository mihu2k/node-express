const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, default: null },
        password: { type: String, default: null },
        googleId: { type: String, default: null},
        name: { type: String, required: true },
        email: { type: String, required: true, default: null},
        group: { type: String, required: true, default: '18050202'},
        faculty: { type: String, required: true, default: 'Information Technology'},
        avatar: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);