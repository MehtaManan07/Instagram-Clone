const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middlewares/auth');

router.get('/', postController.getAllPosts);
router.get('/post/:id', postController.getPost);

router.use(protect)
router.get('/followed', postController.getFollowingPosts);
router.post('/', postController.createPost);
router.put('/like/:id', postController.likePost);
router.put('/unLike/:id', postController.unLikePost);
router.put('/comment/:id', postController.newComment);
router.delete('/comment/:id', postController.deleteComment); // yet to implement

module.exports = router;
