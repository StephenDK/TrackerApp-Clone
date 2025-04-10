const Actions = require("../model/actions");
const asyncHandler = require("../middleware/async");

const ErrorResponse = require("../utils/errorResponse");
// @desc    Get all actions filtered by date
// @route   GET /api/v1/actions
// @access  Public
exports.getActions = asyncHandler(async (req, res, next) => {
  try {
    const actions = await Actions.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: actions,
    });
  } catch (err) {
    console.log(err);
  }
});

// @desc    Get all checked out computers for inventory screen
// @route   GET /api/v1/computers/inventory
// @access  Public
// exports.getInventoryComputers = asyncHandler(async (req, res, next) => {
//   const computers = await Computers.find({ checkedOut: true, archive: false });

//   const checkedOutComputers = computers.map((item) => {
//     const {
//       _id,
//       computerSerial,
//       computerName,
//       computerMake,
//       computerModel,
//       userName,
//       location,
//       lastUpdated,
//     } = item;
//     return {
//       id: _id,
//       type: "computers",
//       serial: computerSerial,
//       name: computerName,
//       make: computerMake,
//       model: computerModel,
//       user: userName,
//       location,
//       lastUpdated,
//     };
//   });

//   res.status(200).json({
//     success: true,
//     data: checkedOutComputers,
//   });
// });
