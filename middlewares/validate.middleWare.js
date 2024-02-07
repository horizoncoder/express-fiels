const { validationResult, check } = require('express-validator');

const validateFile = [
    check('fileName')
        .notEmpty().withMessage('File name is required')
        .isString().withMessage('File name must be string'),
    check('content')
        .notEmpty().withMessage('Content is required')
        .isObject().withMessage('Content must be an object'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateFile,
};
