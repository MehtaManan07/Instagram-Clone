const Post = require('../models/PostModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/UserModel');

exports.createPost = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id
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
  res.json({ success: true, data: post })
});
