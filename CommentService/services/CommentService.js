const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const {NotAcceptable} = require("../helpers/CustomErrors");


const CommentService = {
    findByPostId: async (post_id) => {
        let comments = await Comment
            .find(
                {
                    post_id
                }
            )
            .populate({
                path: 'user',
                select: [
                    'first_name',
                    'last_name'
                ]
            })

        const result = []

        comments.forEach(comment => {
            result.push({
                id: comment.id,
                body: comment.body,
                user: {
                    first_name: comment.user.first_name,
                    last_name: comment.user.last_name
                },
            })
        })

        return {
            comments: result
        }
    },
    create: async (user_id, post_id, body) => {
        const user = await User
            .findOne({
                _id: user_id,
            })

        if (!user) {
            throw new NotAcceptable("User not found");
        }

        let post = await Post
            .findOne({
                _id: post_id,
            })

        if (!post) {
            throw new NotAcceptable("Post not found");
        }

        let comment = new Comment(
            {
                body: body,
                user: user_id,
                post: post_id,
            });
        comment = comment.save();

        return comment;
    }
}

module.exports = CommentService;