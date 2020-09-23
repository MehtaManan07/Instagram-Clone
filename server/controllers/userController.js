const asyncHandler = require('../middlewares/async');
const User = require('../models/UserModel');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('posts');
  if (!user) {
    return next(new ErrorResponse(`No user found with that ID`, 404));
  }
  res.status(200).json({ success: true, data: user });
});
