const mongoose = require("mongoose");

const DeviceLookup = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  userName: { type: String },
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
});

module.exports = mongoose.model("DeviceLookup", DeviceLookup);
