const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        content: { type: String, default: null },
        video: { type: String, default: null },
        image: { type: String, default: null },
        createdAt: Number,
        updatedAt: Number,
    },
    {
        timestamps: { currentTime: () => { return Date.now() } }
    },
);

module.exports = mongoose.model('Post', Post);