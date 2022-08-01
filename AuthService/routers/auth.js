const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthValidator = require("../middleware/validators/AuthValidator");
const router = express.Router();


router.post('/register', [AuthValidator.register], AuthController.register);

router.post('/login', [AuthValidator.login], AuthController.login);

router.post('/refresh-token', [AuthValidator.refreshToken], AuthController.refreshToken);


module.exports = router;