const mongoose = require("mongoose");
let mongooseHidden = require('mongoose-hidden')()


const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true},
);
PostSchema.plugin(mongooseHidden)

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;