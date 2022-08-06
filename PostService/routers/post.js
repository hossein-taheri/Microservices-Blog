const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const PostValidator = require("../middleware/validators/PostValidator")

router.get('/', [PostValidator.index], PostController.index);

router.get('/:post_id/', [PostValidator.show], PostController.show);

router.post('/', [PostValidator.create], PostController.create);

module.exports = router;
