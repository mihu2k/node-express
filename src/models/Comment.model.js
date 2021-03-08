const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        userCommentId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
        postId: { type: String },
        contentComment: { type: String, required: true },
        createdAt: Number,
        updatedAt: Number,
    },
    {
        timestamps: { currentTime: () => { return Date.now() } }
    },
);

module.exports = mongoose.model('Comment', Comment);