const asyncHandler = require("../../middleware/async");
const fs = require("fs");
const ErrorResponse = require("../../utils/errorResponse");
const path = require("path");

exports.getDeskPhonesFile = asyncHandler(async (req, res, next) => {
  const jsonFilePath = path.join(
    __dirname,
    "../../documents/deskphones/deskphones.json"
  );

  try {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      }

      const phones = JSON.parse(data);
      res.status(200).json({
        success: true,
        phones,
      });
    });
    //console.log(data)
  } catch (err) {
    console.log(err);
  }
});
