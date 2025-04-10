const mongoose = require("mongoose");

const BorrowedDeviceSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: [true, "Please add a serial number"],
    unique: true,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  deviceType: {
    type: String,
  },
  checkedOut: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
  },
  userName: {
    type: String,
    trim: true,
    default: null,
    maxlength: [50, "Name must be less than 50 characters"],
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
  election: {
    type: String,
    default: null,
  },
  teleWork: {
    type: Boolean,
    default: false,
  },
  teleWorkStartDate: {
    type: Date,
    default: null,
  },
  teleWorkEndDate: {
    type: Date,
    default: null,
  },
  description: {
    default: null,
    type: String,
    maxlength: [500, "Max lenght must be less then 500 characters"],
  },
  location: {
    type: String,
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: null,
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

module.exports = mongoose.model("BorrowedDevices", BorrowedDeviceSchema);
