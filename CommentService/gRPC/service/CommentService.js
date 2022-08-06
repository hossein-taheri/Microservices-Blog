const CommentService = require("../../services/CommentService");

const CommentGRPCService = (server, post_comment_proto) => {
    server.addService(post_comment_proto.PostComment.CommentService.service, {
        // Server for every RPC in service

        // GetComments RPC
        getComments: async (call, callback) => {
            const data = await CommentService.findByPostId(call.request.id);
            callback(null, data);
        }
    })
}

module.exports = {
    CommentGRPCService,
}