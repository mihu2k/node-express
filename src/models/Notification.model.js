const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        title: { type: String, required: true },
        content: { type: String, default: null },
        files: [{ type: String, default: '' }],
        ofDepartment: { type: String, default: '' },
        createdAt: Number,
        updatedAt: Number,
    },
    {
        timestamps: { currentTime: () => { return Date.now() } }
    },
);

module.exports = mongoose.model('Notification', Notification);