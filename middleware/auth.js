const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = asyncHandler(async (req, res, next) => {
  try {
    console.log("in middleware");
    let token = req.body.token;
    console.log("checking token: ", token);
    if (!token) {
      return next(
        new ErrorResponse("Not authorized to access this route. Bad Token"),
        401
      );
    }

    // verify token
    console.log("decoding token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Set in ENV variable
    console.log("checking user");
    let user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new ErrorResponse("Not authorized to access this route. No User"),
        401
      );
    }

    req.user = user;
    console.log("movin onto next function");
    next();
  } catch (err) {
    return next(
      new ErrorResponse("Not authorized to access this route. Error"),
      401
    );
  }
});
