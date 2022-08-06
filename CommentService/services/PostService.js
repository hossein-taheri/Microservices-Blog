const Post = require("../models/Post");
const PostService = {
    async create(id) {
        const post = await (new Post({
            _id: id,
        })).save();
    }
}

module.exports = PostService;