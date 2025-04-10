const Monitors = require("../model/monitors");
const Computers = require("../model/computer");
const Phones = require("../model/phone");
const Docks = require("../model/dockingStations");
const Borrowed = require("../model/borrowedDevices");
const Accessories = require("../model/accessories");
const Deskphones = require("../model/deskPhone");
let updateData = async () => {
  try {
    console.log("UPDATING FIELDS");
    await Promise.all([
      Computers.updateMany({}, { $set: { tags: [] } }),
      Monitors.updateMany({}, { $set: { tags: [] } }),
      Phones.updateMany({}, { $set: { tags: [] } }),
      Docks.updateMany({}, { $set: { tags: [] } }),
      Borrowed.updateMany({}, { $set: { tags: [] } }),
      Accessories.updateMany({}, { $set: { tags: [] } }),
      Deskphones.updateMany({}, { $set: { tags: [] } }),
    ]);
    console.log("Updated all collections");
  } catch (err) {
    console.log("ERROR", err);
  }
};
// test
module.exports = updateData;
