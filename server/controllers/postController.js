const Post = require('../models/PostModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');

// @route    POST api/v1/posts/
// @desc     Create a post
// @access   Private
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const post = await Post.create(req.body);
  res.json({
    success: true,
    data: post,
  });
});

// @route    GET api/v1/posts/post/:id
// @desc     Get a post by id
// @access   Private || Public, not yet decided
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }
  res.json({ success: true, data: post });
});

// @route    GET api/v1/posts/
// @desc     Get all posts
// @access   Private || Public, not yet decided
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.json({ success: true, count: posts.length, data: posts });
});

// @route    GET api/v1/posts/followed
// @desc     Get the posts of those people who the user follow
// @access   Private
exports.getFollowingPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: { $in: req.user.following } });

  res.json({ success: true, count: posts.length, data: posts });
});

// @route    PUT api/v1/posts/like/:id
// @desc     like a post
// @access   Private
exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }
  // Check if the post has already been liked
  if (post.likes.includes(req.user._id)) {
    return next(new ErrorResponse('Post already liked', 400));
  }

  const likedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.user._id } },
    { new: true }
  );

  res.json({ success: true, data: likedPost });
});

// @route    PUT api/v1/posts/unLike/:id
// @desc     unLike a post
// @access   Private
exports.unLikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }

  // Check if the post has already been liked
  if (!post.likes.includes(req.user._id)) {
    return next(new ErrorResponse('Post already unLiked', 400));
  }

  const unLikedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

  res.json({ success: true, data: unLikedPost });
});

// @route    DELETE api/v1/posts/:id
// @desc     delete a post
// @access   Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse('No post found with that id', 404));
  }

  //this check is going to explicitely handled on client side
  if (post.user.id.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("You cannot touch someone else's post"));
  }

  await post.remove();
  res.status(204).json({ succes: true });
});
