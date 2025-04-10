const mongoose = require("mongoose");
const DeskPhone = require("../model/deskPhone"); // Adjust the path as necessary

const addDeskPhoneFields = async () => {
  try {
    await DeskPhone.updateMany(
      {},
      {
        $set: {
          // checkedOut: true,
          userName: "",
          election: "",
          checkedOutDate: "",
          checkedInDate: "",
          prevUser: "",
        },
      }
    );
    console.log("New key-value pair added");
  } catch (error) {
    console.error("Error adding fields:", error);
  }
};

const removeDeskPhoneFields = async () => {
  try {
    //   await DeskPhone.updateMany(
    //     {},
    //     {
    //       $unset: {
    //         checkedOut: "",
    //         userName: "",
    //         election: "",
    //         checkedOutDate: "",
    //         checkedInDate: "",
    //       },
    //     }
    //   );
    console.log("Existing key-value pair removed");
  } catch (error) {
    console.error("Error removing fields:", error);
  }
};

module.exports = {
  addDeskPhoneFields,
  removeDeskPhoneFields,
};

// const updateDocuments = async () => {
//   try {
//     // // Add a new key-value pair to all documents
//     // await DeskPhone.updateMany(
//     //   {},
//     //   {
//     //     $set: {
//     //       checkedOut: true,
//     //       userName: "",
//     //       election: "",
//     //       checkedOutDate: "",
//     //       checkedInDate: "",
//     //       prevUser: "",
//     //     },
//     //   } // Adjust the key and value as necessary
//     // );
//     // console.log("New key-value pair added");

//     // Remove an existing key-value pair from all documents
//     await DeskPhone.updateMany(
//       {},
//       {
//         $unset: {
//           checkedOut: "",
//           userName: "",
//           election: "",
//           checkedOutDate: "",
//           checkedInDate: "",
//         },
//       } // Adjust the key to the one you want to remove
//     );

//     // console.log("Existing key-value pair removed");
//   } catch (error) {
//     console.error("Error updating documents:", error);
//   }
// };

// module.exports = updateDocuments;
