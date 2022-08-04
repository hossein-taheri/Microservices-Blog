const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ApiResponse = require("../helpers/responses/ApiResponse");
const {NotAcceptable} = require("../helpers/CustomErrors");

const CommentController = {
    create: async (req, res, next) => {
        try {
            const user = await User
                .findOne({
                    id: req.user_id,
                })

            if (!user) {
                throw new NotAcceptable("User not found");
            }

            let post = await Post
                .findOne({
                    _id: req.params.post_id,
                })
            console.log({
                params: req.params,
                post_id: req.params.post_id,
                post,
            })

            if (!post) {
                throw new NotAcceptable("Post not found");
            }



            const comment = await (
                new Comment(
                    {
                        body: req.body.body,
                        user_id: req.user_id,
                        post_id: req.params.post_id,
                    })
            ).save();

            return ApiResponse
                .message(
                    req,
                    res,
                    "Comment created successfully",
                    comment
                );
        } catch (err) {
            next(err);
        }
    },
}

module.exports = CommentController;