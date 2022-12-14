const jsonwebtoken = require('jsonwebtoken');
const JWTStingKey = process.env.JWT_SECRET_KEY;

const JWT = {
    issueAccessToken: (id) => {
        const signOptions = {
            expiresIn: "1h",
            algorithm: "HS256",
        };
        const payload = {
            id: id,
            type: 'AccessToken'
        };
        const signedToken = jsonwebtoken.sign(payload, JWTStingKey, signOptions);

        return {
            token: signedToken,
            expiresIn: signOptions.expiresIn,
        }
    },
    issueRefreshToken: (id) => {
        const signOptions = {
            expiresIn: "1d",
            algorithm: "HS256",
        };
        const payload = {
            id: id,
            type: "RefreshToken"
        };
        const signedToken = jsonwebtoken.sign(payload, JWTStingKey, signOptions);

        return {
            token: signedToken,
            expiresIn: signOptions.expiresIn,
        }
    },
    verifyRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            const verifyOptions = {
                expiresIn: "1d",
                algorithm: "HS256",
            };
            jsonwebtoken.verify(token, JWTStingKey, verifyOptions, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                if (decoded.type !== "RefreshToken") {
                    reject(new Error("Token is not a refresh token"))
                }
                resolve(decoded);
            });
        });
    },
}

module.exports = JWT;