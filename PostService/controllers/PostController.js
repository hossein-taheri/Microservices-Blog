const ApiResponse = require("../helpers/responses/ApiResponse");
const PostService = require("../services/PostService");
const PostController = {
    async index(req, res, next) {
        try {
            const page = req.query.page;

            const posts = await PostService.index(page);

            console.log(posts)

            return ApiResponse.message(
                req,
                res,
                null,
                posts
            )
        } catch (err) {
            next(err)
        }
    },
    async show(req, res, next) {
        try {
            const post = await PostService.show(
                req.params.post_id
            );


            return ApiResponse.message(
                req,
                res,
                null,
                post
            )
        } catch (err) {
            next(err)
        }
    },
    async create(req, res, next) {
        try {
            const post = await PostService.create(
                req.user_id,
                req.body.title,
                req.body.description
            );

            return ApiResponse.message(
                req,
                res,
                null,
                post
            )
        } catch (err) {
            next(err)
        }
    },
}

module.exports = PostController;