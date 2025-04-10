const Actions = require("../model/actions");

// Exported Function for Logging Actions
const logAction = async ({
  action,
  type,
  referenceId,
  serial,
  receiver,
  author,
}) => {
  try {
    // Validate required fields
    if (!action || !serial) {
      throw new Error("Action and Serial are required");
    }

    // Create and save the action entry
    const actionEntry = new Actions({
      action,
      type,
      referenceId,
      serial,
      author: author || null, // Default to null if not provided
      receiver: receiver || null, // Default to null if not provided
    });

    await actionEntry.save();

    console.log("Action logged successfully:", actionEntry);
    // return actionEntry; // Return the saved entry if needed
  } catch (error) {
    console.error("Error logging action:", error);
    throw error; // Re-throw to handle in the caller function
  }
};

module.exports = logAction;
