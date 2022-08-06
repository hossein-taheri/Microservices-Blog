const Comment = require("../models/Comment");

const CommentService = {
    getAllCommentsByPostId: async (post_id) => {

        let comments = await Comment
            .find(
                {
                    post_id
                },
                {},
                {
                    new: true
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
                    firstName: comment.user.first_name,
                    lastName: comment.user.last_name
                },
            })
        })

        return {
            comments: result
        }
    }
}

module.exports = CommentService;