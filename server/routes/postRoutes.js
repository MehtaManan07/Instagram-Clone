const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentRouter = require('./commentRoutes')
const { protect } = require('../middlewares/auth');

router.use('/:postId/comments',commentRouter)

router.get('/', postController.getAllPosts);
router.get('/post/:id', postController.getPost);

router.use(protect)
router.get('/followed', postController.getFollowingPosts);
router.post('/', postController.createPost);
router.put('/like/:id', postController.likePost);
router.put('/unLike/:id', postController.unLikePost);
router.delete('/:id',postController.deletePost)
// router.put('/comment/:id', postController.newComment);
// router.delete('/comment/:postId/:commentId', postController.deleteComment); 

module.exports = router;
