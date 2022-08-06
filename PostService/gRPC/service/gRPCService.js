const PROTO_PATH = __dirname + '/../protos/post_comment.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const host = process.env.GRPC_HOST || 'localhost';
const port = process.env.GRPC_PORT || 9090;

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

const client = new post_comment_proto.PostComment.CommentService(
    `${host}:${port}`,
    grpc.credentials.createInsecure()
);

function getComments(post_id) {
    return new Promise((resolve, reject) => {
        const post = {
            id: post_id
        }
        client.getComments(post, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}


module.exports = {
    getComments
};