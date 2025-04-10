const asyncHandler = require("../middleware/async");

const ErrorResponse = require("../utils/errorResponse");

// Scripts
const addArchiveField = require("../scripts/addArchiveField");

const updateUserNameFromUser = require("../scripts/transferUserDeskPhone");
// @desc    Set Archive Field for all MongoDB Documents
// @route   GET /api/v1/scripts/add/archive/field
// @access  Public
exports.archiveField = asyncHandler(async (req, res, next) => {
  try {
    await addArchiveField();
    res
      .status(200)
      .json({ message: "Archive field added successfully to all collections" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add archive field" });
  }
});

// @desc    Add Field for all MongoDB Documents
// @route   GET /api/v1/scripts/add/deskphone/field
// @access  Public
exports.addDPField = asyncHandler(async (req, res, next) => {
  try {
    await addDeskPhoneFields();
    res.status(200).json({
      message: "New field added successfully to all Desk Phones",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add New field" });
  }
});

// @desc    Remove Field from all MongoDB Documents
// @route   GET /api/v1/scripts/remove/archive/field
// @access  Public
exports.removeDocumentField = asyncHandler(async (req, res, next) => {
  try {
    await removeDeskPhoneFields();
    res
      .status(200)
      .json({ message: "New field removed successfully from all Desk Phones" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add archive field" });
  }
});

// @desc    Transfer Desk Phone User Values
// @route   GET /api/v1/scripts/transfer/user/field
// @access  Public
exports.transferUserDocumentField = asyncHandler(async (req, res, next) => {
  try {
    await updateUserNameFromUser();
    res
      .status(200)
      .json({ message: "Transfered users successfully from all Desk Phones" });
  } catch (error) {
    res.status(500).json({ error: "Failed to transfer users field" });
  }
});
