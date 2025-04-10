const asyncHandler = require("../../middleware/async");
const fs = require("fs");
const ErrorResponse = require("../../utils/errorResponse");
const path = require("path");

exports.getComputerFile = asyncHandler(async (req, res, next) => {
  const jsonFilePath = path.join(
    __dirname,
    "../../documents/computers/computers.json"
  );

  try {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      }

      const computers = JSON.parse(data);
      res.status(200).json({
        success: true,
        computers,
      });
    });
    //console.log(data)
  } catch (err) {
    console.log(err);
  }
});

exports.getComputerTypes = asyncHandler(async (req, res, next) => {
  const jsonFilePath = path.join(
    __dirname,
    "../../documents/computers/deviceType.json"
  );

  try {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      }

      const deviceTypes = JSON.parse(data);
      res.status(200).json({
        success: true,
        deviceTypes,
      });
    });
    //console.log(data)
  } catch (err) {
    console.log(err);
  }
});
