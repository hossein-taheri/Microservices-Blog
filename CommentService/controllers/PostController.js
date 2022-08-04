const Post = require('../models/Post');
const User = require('../models/User');

const PostController = {
    async create(id) {
        const $post = await (new Post({
            _id: id,
        })).save();
    }
}

module.exports = PostController;