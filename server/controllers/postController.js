const Post = require('../models/PostModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/UserModel');

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const post = await Post.create(req.body);
  res.json({
    success: true,
    data: post,
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }
  res.json({ success: true, data: post });
});

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.json({ success: true, count: posts.length, data: posts });
});

exports.getFollowingPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: { $in: req.user.following } });

  res.json({ success: true, count: posts.length, data: posts });
});

exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }
  // Check if the post has already been liked
  if (post.likes.includes(req.user._id)) {
    return next(new ErrorResponse('Post already liked',400))
  }

  const likedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.user._id } },
    { new: true }
  );

  res.json({ success: true, data: likedPost });
});

exports.unLikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }

  // Check if the post has already been liked
  if (
    !post.likes.includes(req.user._id)
  ) {
    return next(new ErrorResponse('Post already unLiked',400))
  }

  const unLikedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

  res.json({ success: true, data: unLikedPost });
});

exports.newComment = asyncHandler(async (req, res, next) => {
  const comment = {
    text: req.body.text,
    user: req.body.user,
    name: req.body.name,
  };
  console.log(req.body)
  if (comment.text === '' ) {
    return next(new ErrorResponse(`Comment cannot be empty`));
  }
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment },
  });
  res.json({ success: true, data: post });
});

exports.deleteComment = asyncHandler(async (req, res) => {
//   const post = await Post.findById(req.params.postId);

//   // Pull out comment
//   const commentToDelete = post.comments.find(
//     (comment) => comment.id === req.params.commentId
//   );

//   // Make sure comment exists
//   if (!commentToDelete) {
//     return next(new ErrorResponse('Comment does not exist', 404));
//   }

//   // Get remove index
//   const removeIndex = post.comments
//     .map((comment) => comment.id)
//     .indexOf(req.params.commentId);

//   post.comments.splice(removeIndex, 1);

//   await post.save();

//   res.json({ success: true, data: post });
});
