const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  //log to console for developer
  // console.log(err.stack.red);
  /* IMPORTANT
        If you ever want to test for error conditon log error like below
        to see what comes in the error object
    */
  console.log(err);

  // Mongoose bad objectId
  console.log("ERR.NAME", err.name);
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = "Cannot create a duplicate resource";
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // JSON WEB TOKEN
  if (err.name === "JsonWebTokenError") {
    const message = "Please Authenticate";
    error = new ErrorResponse(message, 401);
  }

  // JSON WEB TOKEN
  if (err.name === "TokenExpiredError") {
    const message = "Session Expired";
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
