const mongoose = require("mongoose");

const MonitorSchema = new mongoose.Schema({
  monitorSerial: {
    type: String,
    required: [true, "Please add serial number"],
    unique: true,
  },
  monitorMake: {
    type: String,
  },
  monitorModel: {
    type: String,
  },
  periphs: {
    type: Array,
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
  division: {
    type: String,
    default: null,
  },
  manager: {
    type: String,
    default: null,
  },
  election: {
    type: String,
  },
  tags: {
    type: Array,
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

module.exports = mongoose.model("Monitors", MonitorSchema);
