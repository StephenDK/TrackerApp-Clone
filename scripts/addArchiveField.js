const Computers = require("../model/computer");
const Monitors = require("../model/monitors");
const Phones = require("../model/phone");
const Docks = require("../model/dockingStations");
const Accessories = require("../model/accessories");
const BorrowedDevices = require("../model/borrowedDevices");
const DeskPhones = require("../model/deskPhone");

const addArchiveField = async () => {
  try {
    // // Add a new key-value pair to all documents
    await Computers.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );
    await Monitors.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );
    await Phones.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );
    await Docks.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );
    await Accessories.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );
    await BorrowedDevices.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );
    await DeskPhones.updateMany(
      {},
      {
        $set: {
          archive: false,
          archiveDate: null,
        },
      } // Adjust the key and value as necessary
    );

    console.log("Adding Archive Key Value Pair");
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};

module.exports = addArchiveField;
