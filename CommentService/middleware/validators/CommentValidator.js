const {body, validationResult, param} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');
const ObjectId = require('mongoose').Types.ObjectId;

const CommentValidator = {
    create: [
        body("body")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 250})
            .bail(),
        param("post_id")
            .trim()
            .escape()
            .custom(post => {
                if (!ObjectId.isValid(post)) {
                    return Promise.reject("Post id is not an object id");
                } else {
                    return Promise.resolve();
                }
            })
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return ApiResponse
                    .ExpressValidatorError(
                        req,
                        res,
                        errors
                    )
            else
                next();
        },
    ],
}

module.exports = CommentValidator;