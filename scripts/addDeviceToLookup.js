const mongoose = require("mongoose");

// MongoDB Models
// const Docks = require("../model/docks");
// const ITAM = require("../model/borrowedDevices");
// const Computers = require("../model/computer");
// const Monitors = require("../model/monitors");
// const Phones = require("../model/phone");
// const Deskphones = require("../model/deskPhone");

const Accessories = require("../model/accessories");

const DeviceLookup = require("../model/deviceLookup"); // Replace with your actual DeviceLookup model file path

const addDeviceToLookUp = async () => {
  // Connect to MongoDB
  // Add DB URL HERE
  // Database connection URLs
  let prodDBURL = null;

  try {
    // Connect to MongoDB
    await mongoose.connect(prodDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Fetch all computers
    const devices = await Accessories.find();
    console.log(`Found ${devices.length} items`);

    // Prepare data for DeviceLookup
    const deviceLookupEntries = devices.map((element) => ({
      serial: element.barcode,
      userName: element.userName,
      type: "accessory",
      referenceId: element._id,
    }));

    // Insert into DeviceLookup
    const insertedEntries = await DeviceLookup.insertMany(deviceLookupEntries, {
      ordered: true,
    });

    console.log(`Inserted ${insertedEntries.length} entries into DeviceLookup`);

    // Close the database connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
};

// Remove Devices from LookUp
const removeDevicesByType = async (type) => {
  // Add DB URL HERE

  try {
    // Connect to MongoDB
    await mongoose.connect(prodDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Remove devices of the specified type
    const result = await DeviceLookup.deleteMany({ type });
    console.log(`Removed ${result.deletedCount} devices of type '${type}'`);

    // Close the database connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
};

// addDeviceToLookUp();

// removeDevicesByType("monitors");
