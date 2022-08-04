const {body, validationResult} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');

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