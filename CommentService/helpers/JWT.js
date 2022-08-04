const jsonwebtoken = require('jsonwebtoken');
const JWTStingKey = process.env.JWT_SECRET_KEY;

const JWT = {
    verifyAccessToken : ( token ) => {
        return new Promise((resolve, reject) => {
            const verifyOptions = {
                expiresIn: "1h",
                algorithm: "HS256"
            };
            jsonwebtoken.verify(token, JWTStingKey, verifyOptions, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                if (decoded.type !== 'AccessToken'){
                    reject(new Error('Token is not an access token'))
                }
                resolve(decoded);
            });
        });
    },
}

module.exports = JWT;