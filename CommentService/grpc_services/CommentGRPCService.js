const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync("post_comment.proto");
const post_comment_proto = grpc.loadPackageDefinition(packageDefinition);
const CommentService = require("../services/CommentService.js")

const CommentGRPCService = (server) => {
    server.addService(post_comment_proto.PostComment.CommentService.service, {
        getComments: async (call, callback) => {
            const data = await CommentService.getAllCommentsByPostId(call.request.id);
            callback(null, data);
        }
    })

}

module.exports = CommentGRPCService;