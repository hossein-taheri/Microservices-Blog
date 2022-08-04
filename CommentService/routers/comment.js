const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const CommentValidator = require("../middleware/validators/CommentValidator")

router.post('/', [CommentValidator.create], CommentController.create);


module.exports = router;
