const User = require('../model/user');
const jwt = require("jsonwebtoken");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc  Get all users
// @route GET /api/v1/auth
exports.getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find({});

  res.status(200).json({
    success: true,
    data: users
  })
})

// @desc  Get single users
// @route GET /api/v1/auth/:id
exports.getUser = asyncHandler( async (req, res, next) => {
  console.log(req.body);
  let checkToken = req.body.token;

  const decoded = await jwt.verify(checkToken, process.env.JWT_SECRET);
  console.log("DECODED", decoded);
  
  
  let user = await User.findById(decoded.id);
  
  if (!user) {
    return next(new ErrorResponse(`User with id ${checkToken} does not exist`), 401);
  }
  res.status(200).json({
    success: true,
    data: user
  })
});


// @desc  PUT change users role
// @route PUT /api/v1/users/update/role/:id 
exports.updateRole = asyncHandler( async (req, res, next) => {
  console.log('UPDATING ROLE');
  console.log('REQUEST BODY', req.body);
  console.log(req.params.id);
  let data = {
    role: req.body.role
  };

  try{
    let user = await User.findById(req.params.id);
    console.log('FINDING USER', user);
    if(!user) {
      return next(new ErrorResponse('No user matches that id', 404));
    }
    console.log('UPDATING USER ROLE');
    user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });
    console.log('USER UPDATED', user);
    res.status(200).json({
      success: true,
    })
  }catch(error) {
    next();
  }
});


// @desc  DELETE remove user from app
// @route DELETE /api/v1/users/update/delete/:id 
exports.deleteUser = asyncHandler( async (req, res, next) => {
  console.log('DELETING USER');
  console.log('USER: ', req.params.id);

  // Delete User In MongoDB
  try{
    let user = await User.findById(req.params.id);

    if(!user) {
      return next(new ErrorResponse(`No user matches id of ${req.params.id}`), 404)
    }

    user.remove();
    
  } catch(err) {
    console.log(err)
    next()
  }

  res.status(200).json({
    success: true
  })
})
