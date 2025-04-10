const mongoose = require("mongoose");

const DockingStationSchema = new mongoose.Schema({
  dockingStationSerial: {
    type: String,
    required: [true, "Please add serial number"],
    unique: true,
  },
  dockingStationMake: {
    type: String,
  },
  dockingStationModel: {
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
  tags: {
    type: Array,
  },
  location: {
    type: String,
  },
  election: {
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
  periphs: {
    type: Array,
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

module.exports = mongoose.model("DockingStations", DockingStationSchema);
