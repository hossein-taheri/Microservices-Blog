const express = require("express");
const router = express.Router();
const post = require('./post')
const JWTAuth = require('../middleware/JWTAuth')

router.use(JWTAuth.check)

router.use('/post/', post);


module.exports = router;