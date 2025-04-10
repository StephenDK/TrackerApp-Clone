const mongoose = require("mongoose");

const ActionsSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: [
      "inventory",
      "checkout",
      "checkin",
      "edit",
      "tag",
      "archive",
      "unarchive",
      "telework",
      "line",
    ],
  },
  type: {
    type: String,
    required: true,
    enum: [
      "computers",
      "monitors",
      "phones",
      "deskphones",
      "itam",
      "docks",
      "accessory",
    ],
  },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  serial: {
    type: String,
    required: [true, "Serial Number is Required"],
  },
  author: {
    type: String,
    trim: true,
    default: null,
  },
  receiver: {
    type: String,
    trim: true,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    index: { expires: "30d" }, // TTL set to 5 minutes, 30d 30 days
  },
});

module.exports = mongoose.model("Actions", ActionsSchema);
