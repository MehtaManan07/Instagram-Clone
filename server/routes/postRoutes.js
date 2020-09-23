const express = require('express');
const router = express.Router()
const postController = require('../controllers/postController');
const { protect } = require('../middlewares/auth');

router.route('/')
.post(protect,postController.createPost);
router.route('/:id')
.get(postController.getPost)

module.exports = router