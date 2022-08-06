const {body, param, query, validationResult} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');
const ObjectId = require('mongoose').Types.ObjectId;

const PostValidator = {
    index: [
        query("page")
            .trim()
            .escape()
            .optional()
            .isInt({min: 1})
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
    show: [
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
    create: [
        body("title")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 1, max: 100})
            .bail(),
        body("description")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 5000})
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

module.exports = PostValidator;