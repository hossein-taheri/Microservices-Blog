const PROTO_PATH = __dirname + '/protos/post_comment.proto';
const GRPC_PORT = process.env.GRPC_PORT || 9090;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const {CommentGRPCService} = require("./service/CommentService");
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const post_comment_proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()


server.bindAsync(
    `0.0.0.0:${GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            throw err;
        }

        console.log(`gRPC server is running at http://0.0.0.0:${port}`)

        // Server for every service

        // Comment Service
        CommentGRPCService(server, post_comment_proto);

        server.start()
    }
)

