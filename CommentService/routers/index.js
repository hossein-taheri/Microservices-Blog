const express = require("express");
const router = express.Router();
const comment = require('./comment')
const JWTAuth = require('../middleware/JWTAuth')

router.use(JWTAuth.check)

router.use('/post/', comment);


module.exports = router;