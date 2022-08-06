const mongoose = require("mongoose");
let mongooseHidden = require('mongoose-hidden')()


const PostSchema = new mongoose.Schema(
    {},
    {timestamps: true},
);
PostSchema.plugin(mongooseHidden)

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;