const User = require("../model/User");
const ApiResponse = require("../helpers/responses/ApiResponse");
const JWT = require("../helpers/JWT");
const Password = require("../helpers/Password");
const {InternalServerErrors} = require("../helpers/CustomErrors");
const {NotAcceptable} = require("../helpers/CustomErrors");
const MessageBroker = require("../helpers/MessageBroker");

const AuthController = {
    register: async (req, res, next) => {
        try {
            let user = await User
                .findOne({
                    $or: [
                        {
                            email: req.body.email
                        },
                        {
                            user_name: req.body.user_name
                        }
                    ]
                })


            if (user && (user.email.toString() === req.body.email.toString())) {
                throw new NotAcceptable("The entered email already has selected");
            } else if (user) {
                throw new NotAcceptable("The entered username already has selected");
            }


            if (!req.body.password) {
                throw new InternalServerErrors("The entered password is not correct")
            }

            let password = Password.genPassword(req.body.password)

            user = new User(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    user_name: req.body.user_name,
                    email: req.body.email,
                    salt: password.salt,
                    hash: password.hash,
                    register_at: Date.now(),
                });

            user = await user.save()

            MessageBroker.sendMessageToQueue(
                'post.created',
                {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    email: user.email,
                }
            );

            return ApiResponse
                .message(
                    req,
                    res,
                    "Account registered successfully",
                    null
                );
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            let user = await User
                .findOne({
                    $or: [
                        {
                            email: req.body.email
                        },
                        {
                            user_name: req.body.email
                        }
                    ]
                })

            if (!user) {
                throw new NotAcceptable("Incorrect email or password");
            }

            const passwordIsValid = Password
                .validPassword(
                    req.body.password,
                    user.hash,
                    user.salt
                );


            if (!passwordIsValid) {
                throw new NotAcceptable("Incorrect email or password");
            }


            const accessToken = JWT.issueAccessToken(user._id);
            const refreshToken = JWT.issueRefreshToken(user._id);


            return ApiResponse
                .message(
                    req,
                    res,
                    "Successfully logged in",
                    {
                        AccessToken: accessToken,
                        RefreshToken: refreshToken
                    }
                );
        } catch (err) {
            next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            let refreshToken = req.body.refresh_token;
            if (!refreshToken) {
                throw new NotAcceptable("Enter the refresh token");
            }

            let decoded = await JWT.verifyRefreshToken(refreshToken)

            let user = await User.findOne({
                _id: decoded.id,
            })

            if (!user) {
                throw new NotAcceptable("The refresh token is incorrect");
            }

            let accessToken = JWT.issueAccessToken(user._id);

            return ApiResponse
                .message(
                    req,
                    res,
                    "The token was successfully refreshed",
                    {
                        AccessToken: accessToken
                    }
                );

        } catch (err) {
            next(err);
        }
    },
}

module.exports = AuthController;