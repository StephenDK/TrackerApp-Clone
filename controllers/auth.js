const User = require("../model/user");
const Computers = require("../model/computer");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc  Register user
// @route POST /api/v1/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    let checkToken = req.body.trackerUserToken;
    console.log("TOKEN", checkToken);
    const decoded = await jwt.verify(checkToken, process.env.JWT_SECRET);
    console.log("DECODED", decoded);
    let checkUser = await User.findById(decoded.id);
    console.log(checkUser);
    if (!checkUser) {
      return next(new ErrorResponse("Sorry you cannot register"), 401);
    }

    // if (checkUser.role !== "administrator") {
    //   return next(
    //     new ErrorResponse(
    //       "Sorry. The user who invited you must be an administrator"
    //     ),
    //     401
    //   );
    // }

    let label = email.split("@");
    console.log(label);
    let id = req.params;
    console.log(id);

    let data = {
      name: label[0],
      email,
      password,
    };

    console.log("[DATA]: ", data);
    const user = await User.create(data);

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc Replacement for Email new User
// Reason: Google api deprecation
// Generate URL with jsonToken and respond
// Register user
// /api/v1/auth/new/user/:id
exports.sendGeneratedURL = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);

  try {
    let checkToken = req.params.id;
    console.log("TOKEN", checkToken);
    const decoded = await jwt.verify(checkToken, process.env.JWT_SECRET);
    console.log("DECODED", decoded);
    let checkUser = await User.find({ _id: decoded.id });
    console.log(checkUser);
    if (!checkUser) {
      return next(new ErrorResponse("Sorry you cannot register"), 401);
    }

    let url = `https://gentle-headland-50783.herokuapp.com/register/newuser/trackerapp/${checkToken}`;

    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// @desc  Login User
// Post /api/v1/auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  // check email and passwords
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // check of user
  const user = await User.findOne({ email: email }).select("+password");
  console.log("USER", user);
  // check user
  if (!user) {
    return next(new ErrorResponse("No Account Found", 401));
  }

  // match password
  const isMatch = await user.matchPassword(password);

  // password not a match
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    console.log("[AUTHENTICATING]: ", req.body);
    const { token } = req.body;
    // Verify Token  Example of token payload { id: iat:xxx exp}
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // The decoded object will have to user id
    // req,user will always be the current logged in user
    let user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ErrorResponse(`User Profile Cannot be Found.`, 404));
    }
    console.log("[AUTHENTICATED]: ", user);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    // return next(new ErrorResponse("Not authorized to access this route", 401));
    console.log(err);
    next(err);
  }
});

exports.backDoorRegister = asyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  let user = await User.create({
    name,
    email,
    password,
  });

  console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

// @desc    Forgot Password Email User
// @route
// @access  public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  let resetURL = `https://gentle-headland-50783.herokuapp.com/forgot/password/reset/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      html: `<a href=${resetURL}>Please follow this link to reset you password for TrackerApp</a>`,
    });

    res.status(200).json({
      success: true,
      msg: "Your password reset email successfully sent",
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @desc    Reset Password
// @route   PUT
// @access  public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get token from url and hash it
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.userToken)
    .digest("hex");
  console.log(resetPasswordToken);
  // Find the user by the resetToken and allow if expiration is greater than now
  const user = await User.findOne({
    resetPasswordToken,
  });
  console.log(user);
  // Check if the user exists
  if (!user) {
    return next(new ErrorResponse("Sorry we cannot update your password", 400));
  }

  // Token checks out set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    msg: "Your password has been reset. Please log back in.",
  });
});
