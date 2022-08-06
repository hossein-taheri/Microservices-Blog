const User = require("../model/User");
const {NotAcceptable, InternalServerErrors} = require("../helpers/CustomErrors");
const Password = require("../helpers/Password");
const producers = require("../RabbitMQ");
const JWT = require("../helpers/JWT");
const AuthService = {
    register: async (
        first_name,
        last_name,
        user_name,
        email,
        password
    ) => {
        let user = await User
            .findOne({
                $or: [
                    {
                        email
                    },
                    {
                        user_name
                    }
                ]
            })

        if (user && (user.email.toString() === email.toString())) {
            throw new NotAcceptable("The entered email already has selected");
        } else if (user) {
            throw new NotAcceptable("The entered username already has selected");
        }

        if (!password) {
            throw new InternalServerErrors("The entered password is not correct")
        }

        let generated_password = Password.genPassword(password)

        user = new User(
            {
                first_name,
                last_name,
                user_name,
                email,
                salt: generated_password.salt,
                hash: generated_password.hash,
                register_at: Date.now(),
            });

        user = await user.save()

        producers.sendMessageToQueue(
            'user.created',
            {
                id: user.id,
                first_name,
                last_name,
                user_name,
                email,
            }
        );
    },
    login: async (email, password) => {
        let user = await User
            .findOne({
                $or: [
                    {
                        email: email
                    },
                    {
                        user_name: email
                    }
                ]
            })

        if (!user) {
            throw new NotAcceptable("Incorrect email or password");
        }

        const passwordIsValid = Password
            .validPassword(
                password,
                user.hash,
                user.salt
            );

        if (!passwordIsValid) {
            throw new NotAcceptable("Incorrect email or password");
        }


        const accessToken = JWT.issueAccessToken(user._id);
        const refreshToken = JWT.issueRefreshToken(user._id);

        return {
            accessToken,
            refreshToken
        }
    },
    refreshToken: async (refresh_token) => {
        if (!refresh_token) {
            throw new NotAcceptable("Enter the refresh token");
        }

        let decoded = await JWT.verifyRefreshToken(refresh_token)

        let user = await User.findOne({
            _id: decoded.id,
        })

        if (!user) {
            throw new NotAcceptable("The refresh token is incorrect");
        }

        const accessToken = JWT.issueAccessToken(user._id);

        return accessToken;
    },
}

module.exports = AuthService;