const asyncHandler = require("../../middleware/async");
const fs = require("fs");
const ErrorResponse = require("../../utils/errorResponse");
const path = require("path");

exports.getDivisionsAndManagers = asyncHandler(async (req, res, next) => {
  const jsonFilePath = path.join(
    __dirname,
    "../../documents/divisions/divisions.json"
  );

  try {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      }

      const divisions = JSON.parse(data);
      res.status(200).json({
        success: true,
        divisions,
      });
    });
    //console.log(data)
  } catch (err) {
    console.log(err);
  }
});
