const ApiResponse = require("../helpers/responses/ApiResponse");
const AuthService = require("../services/AuthService");

const AuthController = {
    register: async (req, res, next) => {
        try {
            await AuthService.register(
                req.body.first_name,
                req.body.last_name,
                req.body.user_name,
                req.body.email,
                req.body.password,
            )

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
            const {
                accessToken,
                refreshToken
            } = await AuthService.login(
                req.body.email,
                req.body.password
            )

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
            const accessToken = await AuthService.refreshToken(
                req.body.refresh_token
            )

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