const User = require('../models/UserModel');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middlewares/async');
const Email = require('../utils/email');
const crypto = require('crypto');

exports.signup = asyncHandler(async (req, res, next) => {

  const newUser = await User.create(req.body);

  // const url = `${req.protocol}://${req.get('host')}/me`
  // await new Email(newUser,url).sendWelcome()
  sendTokenResponse(201, newUser, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // validate password and username
  if (!username || !password) {
    return next(new ErrorResponse('Please add an username and a password', 400));
  }

  // check for user
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch || !user)
    return next(new ErrorResponse('Invalid credentials', 401));

  sendTokenResponse(200, user, res);
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorResponse(`There is no user with email ${req.body.email}`, 404)
    );
  }
  const resetToken = await user.getresetToken();
  await user.save({ validateBeforeSave: false });

  try {
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  
    await new Email(user, resetURL).sendPasswordReset(resetURL)
    res.status(200).json({
      success: true,
      message: 'Token sent to email!',
    });
  } catch (error) {
    console.log('reached catch', error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorResponse(
        `There was an error while sending the email, please try again`,
        500
      )
    );
  }
});
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse(`Token is invalid or has expired`, 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  sendTokenResponse(200, user, res);
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    return next(new ErrorResponse(`No user found`, 404));
  }
  console.log(user);

  //Check current password;
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse(`Incorrect password`, 401));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPassword;
  await user.save();
  sendTokenResponse(200, user, res);
});

const sendTokenResponse = (statusCode, user, res) => {
  const token = user.getSignedJwtToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('sociogram1', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    data: user,
  });
};

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie('sociogram1');
  res.status(200).json({ success: true });
});
