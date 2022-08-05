const GRPC_PORT = process.env.GRPC_PORT || 9090;
const grpc = require("@grpc/grpc-js")
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync("post_comment.proto");
const post_comment_proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()


module.exports = () => {
    server.bindAsync(
        `0.0.0.0:${GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                throw err;
            }
            console.log(`gRPC server is running at http://0.0.0.0:${port}`)

            server.addService(post_comment_proto.PostComment.CommentService.service, {
                getComments: (call, callback) => {
                    console.log(call.request);
                    callback(null, {
                        comments: [
                            {
                                id: 1,
                                firstName: '',
                                lastName: '',
                                body: ""
                            }
                        ]
                    });
                }
            })

            server.start()
        }
    )


}