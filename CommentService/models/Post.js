const mongoose = require("mongoose");
let mongooseHidden = require('mongoose-hidden')()


const PostSchema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        }
    },
    {timestamps: true},
);
PostSchema.plugin(mongooseHidden)

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;