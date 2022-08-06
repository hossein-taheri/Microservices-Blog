const ApiResponse = require("../helpers/responses/ApiResponse");
const CommentService = require("../services/CommentService");

const CommentController = {
    create: async (req, res, next) => {
        try {
            const comment = await CommentService.create(
                req.user_id,
                req.params.post_id,
                req.body.body,
            );

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