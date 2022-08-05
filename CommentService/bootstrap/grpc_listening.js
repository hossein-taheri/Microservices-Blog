const GRPC_PORT = process.env.GRPC_PORT || 9090;
const grpc = require("@grpc/grpc-js")
const server = new grpc.Server()
const CommentGRPCService = require('../grpc_services/CommentGRPCService')

module.exports = () => {
    server.bindAsync(
        `0.0.0.0:${GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                throw err;
            }
            console.log(`gRPC server is running at http://0.0.0.0:${port}`)

            CommentGRPCService(server);


            server.start()
        }
    )


}