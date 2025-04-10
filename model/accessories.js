const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
  serial: {
    type: String,
  },
  barcode: {
    type: String,
    unique: true,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  category: {
    type: String,
  },
  checkedOut: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    trim: true,
    default: null,
    maxlength: [50, "Name must be less than 50 characters"],
  },
  tags: {
    type: Array,
  },
  division: {
    type: String,
    default: null,
  },
  manager: {
    type: String,
    default: null,
  },
  prevUser: {
    type: String,
    default: null,
  },
  description: {
    default: null,
    type: String,
    maxlength: [500, "Max lenght must be less then 500 characters"],
  },
  location: {
    type: String,
    default: null,
  },
  election: {
    type: String,
    default: null,
  },
  editedBy: {
    type: String,
  },
  checkedOutDate: {
    type: Date,
    default: null,
  },
  checkedInDate: {
    type: Date,
    default: null,
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  archive: {
    type: Boolean,
    default: false,
  },
  archiveDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Accessories", AccessorySchema);
