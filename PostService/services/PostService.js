const Post = require("../models/Post");
const {NotFound} = require("../helpers/CustomErrors");
const MessageBroker = require("../helpers/MessageBroker");
const PostService = {
    async index(page = 1) {
        const per_page = 10;

        const posts = await Post
            .find()
            .select([
                "_id",
                "title",
                "short_description",
                "user",
            ])
            .skip((page - 1) * per_page)
            .limit(per_page)
            .populate({
                path: "user",
                select: ["first_name", "last_name"]
            })


        return posts;
    },
    async show(id) {
        const post = await Post
            .findById(id)
            .populate({
                path: "user",
                select: ["first_name", "last_name"]
            })

        if (!post) {
            throw new NotFound("Post not found");
        }

        return post;
    },
    async create(user_id, title, description) {
        const short_description = description.substring(0, 50);
        const post = await (
            new Post({
                user: user_id,
                title,
                short_description,
                description,
            })
        ).save()

        MessageBroker.sendMessageToQueue("post.created", {
            id: post.id,
            title: post.title,
            description: post.description
        })

        return post;
    },
}

module.exports = PostService;