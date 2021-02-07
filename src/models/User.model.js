const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        group: { type: String, required: true },
        faculty: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);