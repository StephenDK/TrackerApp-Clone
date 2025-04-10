const mongoose = require("mongoose");

const DockingStations = require("../model/dockingStations");
const Docks = require("../model/docks");

const transferData = async () => {
  // Database connection URLs

  // Connect to MongoDB
  try {
    await mongoose.connect(prodDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const excludeSerials = ["2TK122X0V9", "2TK122X0X9", "2TK131XBH0"]; // Array of serial numbers to exclude

    // Fetch all documents except those with the specified serial numbers
    const dockingStationsToTransfer = await DockingStations.find({
      dockingStationSerial: { $nin: excludeSerials }, // Exclude these serials
    });

    console.log(
      `Found ${dockingStationsToTransfer.length} documents to transfer`
    );

    // Insert the documents into the new collection
    const insertedDocuments = await Docks.insertMany(dockingStationsToTransfer);

    console.log(
      `Successfully transferred ${insertedDocuments.length} documents to the Docks collection`
    );

    // Optionally, delete the transferred documents from the original collection
    // Uncomment the line below if you want to delete the transferred documents
    // await DockingStations.deleteMany({ dockingStationSerial: { $nin: excludeSerials } });

    // Close the database connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
};

transferData();
