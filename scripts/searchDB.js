const mongoose = require("mongoose");

// Import all your models
const DockingStations = require("../model/dockingStations");
const Computers = require("../model/computer");
const Phones = require("../model/phone");
const Monitors = require("../model/monitors");
const DeskPhones = require("../model/deskPhone");
const Borrowed = require("../model/borrowedDevices");
const Accessories = require("../model/accessories");
// Add more models as needed

// Array of all your models
const models = [
  { name: "DockingStations", model: DockingStations },
  { name: "Computers", model: Computers },
  { name: "Phones", model: Phones },
  { name: "Monitors", model: Monitors },
  { name: "DeskPhones", model: DeskPhones },
  { name: "Borrowed", model: Borrowed },
  { name: "Accessories", model: Accessories },
  // Add more models here
];

const searchIdInAllModels = async (id) => {
  try {
    // Connect to MongoDB
    const dbURL = "";

    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const objectId = mongoose.Types.ObjectId(id); // Ensure the ID is an ObjectId
    let resultsFound = [];

    // Iterate over all models and search for the ID
    for (const { name, model } of models) {
      const result = await model.findById(objectId);
      if (result) {
        console.log(`Found in ${name}:`, result);
        resultsFound.push({ model: name, data: result });
      }
    }

    if (resultsFound.length === 0) {
      console.log("No matches found in any model.");
    }

    // Close the connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
};

// Call the function with the desired _id
searchIdInAllModels("614e340c1d099b00163a2586");
