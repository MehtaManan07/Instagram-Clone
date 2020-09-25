const asyncHandler = require('../middlewares/async');
const User = require('../models/UserModel');
const ErrorResponse = require('../utils/ErrorResponse');

// @route    GET api/v1/users/me
// @desc     Get my profile
// @access   Public
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('posts');
  if (!user) {
    return next(new ErrorResponse(`No user found with that ID`, 404));
  }
  res.status(200).json({ success: true, data: user });
});

// @route    POST api/v1/users/follow/:followId
// @desc     forgot password
// @access   Public
exports.followUser = asyncHandler(async (req, res, next) => {
  const toFollowUser = await User.findById(req.params.followId);

  // check if the user exists
  if (!toFollowUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  //check if the logged in user is already a follower
  //this check is going to explicitely handled on client side
  if (toFollowUser.followers.includes(req.user._id)) {
    return next(new ErrorResponse('You are already following this user', 404));
  }
  // update the logged in user
  await User.findByIdAndUpdate(req.user._id, {
    $push: { following: toFollowUser._id },
  });

  //update the user being followed
  const followedUser = await User.findByIdAndUpdate(
    toFollowUser._id,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  );

  res.json({
    success: true,
    data: followedUser, // will send the data of the followed user
  });
});

// @route    POST api/v1/users/unfollow/:unfollowId
// @desc     forgot password
// @access   Public
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const unFollowUser = await User.findById(req.params.unfollowId);

  // check if the user exists
  if (!unFollowUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  //check if the logged in user is already a follower
  //this check is going to explicitely handled on client side
  if (!unFollowUser.followers.includes(req.user._id)) {
    return next(
      new ErrorResponse("You cannot unfollow the user you don't follow", 404)
    );
  }
  // update the logged in user
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: unFollowUser._id },
    },
    { new: true }
  );

  //update the user being followed
  const unfollowedUser = await User.findByIdAndUpdate(unFollowUser._id, {
    $pull: { followers: req.user._id },
  });

  res.json({
    success: true,
    data: unfollowedUser, // will send the data of the unfollowed user
  });
});

// @route    PUT api/v1/users/
// @desc     update logged in user info
// @access   Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})

  res.json({ success: true, data: user })
});

// @route    GET api/v1/users/:id
// @desc     Get user's profile
// @access   Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if(!user){
    return next(new ErrorResponse(`No user found with that id`,404))
  }

  res.json({ success: true, data: user })
});

// @route    POST api/v1/users/search/:query
// @desc     Search for users
// @access   Private
exports.search = asyncHandler(async (req, res, next) => {
  let userPattern = new RegExp(`^${req.params.query}`) 
  const users = await User.find({ slug: { $regex: userPattern, $options: 'i' }})
  res.json({ success: true, data: users })
});

// @route    DELETE api/v1/users/
// @desc     Deactivate logged in user
// @access   Private
exports.deactivate = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    success: true,
    data: null,
  });
});

