const mongoose = require("mongoose");
const DeskPhone = require("../model/deskPhone"); // Adjust the path as necessary

const updateUserNameFromUser = async () => {
  try {
    await DeskPhone.updateMany({}, [
      {
        $set: {
          userName: "$user",
          checkedOut: {
            $cond: {
              if: { $or: [{ $eq: ["$user", null] }, { $eq: ["$user", ""] }] },
              then: false,
              else: true,
            },
          },
        },
      },
    ]);
    console.log(
      "userName field updated with the value from user field and checkedOut set accordingly for all documents."
    );
  } catch (error) {
    console.error("Error updating userName and checkedOut fields:", error);
  }
};

module.exports = updateUserNameFromUser;
