const mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')()


const CommentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        post_id: {
            type: Number,
            required: true,
            ref: 'Post'
        },
    },
    {timestamps: true},
);
CommentSchema.plugin(mongooseHidden)

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;