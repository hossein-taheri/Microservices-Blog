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

            if (!user){
                throw new NotAcceptable("User not found");
            }

            let post = await Post
                .findOne({
                    id: req.params.post_id,
                })

            if (!post){
                throw new NotAcceptable("User not found");
            }

            const comment = await (
                new Comment(
                {
                    body: req.body.body,
                    user_id: req.body.user_id,
                    post_id: req.params.post_id,
                })
            ).save();

            return ApiResponse
                .message(
                    req,
                    res,
                    "Account registered successfully",
                    comment
                );
        } catch (err) {
            next(err);
        }
    },
}

module.exports = CommentController;