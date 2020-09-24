const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { protect } = require('../middlewares/auth');

router.use(protect);

router
  .route('/')
  .post(commentController.checkPostId, commentController.newComment)
  .get(commentController.getAll);

router.put('/like/:id', commentController.likeComment);
router.put('/unLike/:id', commentController.unLikeComment);

router.get('/:id', commentController.getComment);

// router.use(commentController.checkPostId);
router.use(commentController.checkCommentOwner);
router
  .route('/:id')
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);
module.exports = router;
