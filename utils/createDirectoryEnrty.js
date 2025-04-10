const Directory = require("../model/deviceLookup");
const mongoose = require("mongoose");

// Create an entry in the directory
async function createDirectoryEntry(serial, userName, type, referenceId) {
  try {
    const newEntry = new Directory({
      serial,
      userName,
      type,
      referenceId,
    });

    await newEntry.save();
    console.log("Entry created successfully:", newEntry);
  } catch (error) {
    console.error("Error creating lookup entry:", error);
  }
}

// Function to handle item deletion
async function deleteDirectoryEntry(id) {
  try {
    console.log("[DELETING LOOKUP ENTRY]", id);
    // Validate the input to ensure it's a valid MongoDB ObjectId
    if (!id) {
      throw new Error("Invalid MongoDB _id provided.");
    }

    // Delete the item from your main database
    const device = await Directory.findOneAndDelete({ referenceId: id });
    console.log("[DELETING?]: ", device);

    if (!device) {
      return { status: 404, message: "Device not found." };
    }

    console.log("[Item Removed from Lookup]:");
  } catch (error) {
    console.log(error);
  }
}

/*
 * Updates the userName for a document in the DeviceLookup collection.
 * @param {mongoose.Types.ObjectId} referenceId - The MongoDB ObjectId to find the document.
 * @param {string} userName - The new userName to set.
 * @returns {Promise<void>} - Resolves when the update is complete or throws an error.
 */
async function updateDirectoryUsername(referenceId, userName) {
  try {
    console.log("REFERENCEID", referenceId);
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(referenceId)) {
      throw new Error("Invalid referenceId provided.");
    }

    // Perform the update
    const result = await Directory.updateOne(
      { referenceId: referenceId },
      { $set: { userName: userName } }
    );

    console.log("RESULT", result);

    if (result.matchedCount === 0) {
      throw new Error("No document found with the provided referenceId.");
    }

    console.log(
      `Successfully updated userName for referenceId: ${referenceId}`
    );
  } catch (error) {
    console.error(`Error updating userName: ${error.message}`);
    throw error;
  }
}

module.exports = {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
};
