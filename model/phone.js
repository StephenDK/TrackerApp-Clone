const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema({
  phoneIMEI: {
    type: String,
    required: [true, "The IMEI is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  phoneMake: {
    type: String,
  },
  phoneModel: {
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
    maxlength: [50, "Name must be less than 50 characters"],
    default: null,
  },
  manager: {
    type: String,
    default: null,
  },
  division: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    maxlength: [500, "Max lenght must be less then 500 characters"],
    default: null,
  },
  location: {
    type: String,
  },
  tags: {
    type: Array,
  },
  prevUser: {
    type: String,
    default: null,
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

module.exports = mongoose.model("Phones", PhoneSchema);
