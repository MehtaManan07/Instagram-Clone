const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');

// sort of middleware
exports.checkPostId = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return next(
      new ErrorResponse(`No post found with that id ${req.params.postId}`, 404)
    );
  }
  next();
});

// @route    POST api/v1/posts/:postId/:id
// @desc     create a comment
// @access   Private
exports.newComment = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user._id;

  const newComment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: newComment,
  });
});

// @route    GET api/v1/posts/:postId/comments
// @desc     get all comments for a post
// @access   Private
exports.getAll = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({ success: true, data: comments });
});

// @route    GET api/v1/posts/:postId/:id
// @desc     get a comment
// @access   Private
exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(`No comment found with that id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: comment });
});

// @route    PUT api/v1/posts/like/:postId/:id
// @desc     like a comment
// @access   Private
exports.likeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorResponse('No comment found with that id', 404));
  }
  // Check if the comment has already been liked
  if (comment.likes.includes(req.user._id)) {
    return next(new ErrorResponse('Comment already liked', 400));
  }

  const likedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.user._id } },
    { new: true }
  );

  res.json({ success: true, data: likedComment });
});

// @route    PUT api/v1/posts/unLike/:postId/:id
// @desc     unLike a comment
// @access   Private
exports.unLikeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorResponse('No comment found with that id', 404));
  }
  // Check if the comment has already been liked
  if (!comment.likes.includes(req.user._id)) {
    return next(new ErrorResponse('You have not liked this comment ', 400));
  }

  const likedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

  res.json({ success: true, data: likedComment });
});

// @route    PUT api/v1/posts/:postId/:id
// @desc     update a comment
// @access   Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    return next(
      new ErrorResponse(`No comment found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: comment });
});

// @route    DELETE api/v1/posts/:postId/:id
// @desc     delete a comment
// @access   Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(`No comment found with id ${req.params.id}`, 404)
    );
  }

  await comment.remove();

  res.status(204).json({
    success: true,
    data: null,
  });
});

// very important check
exports.checkCommentOwner = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const post = await Post.findById(req.body.postId);
  if (req.user.id.toString() !== post.user.id.toString()) {
    if (comment.user.id.toString() !== req.user.id.toString())
      return next(
        new ErrorResponse(`You cannot touch someone else's comment.`, 403)
      );
  }
  next();
};
