const mongoose = require("mongoose");

const DeskPhoneSchema = new mongoose.Schema({
  phoneMAC: {
    type: String,
    required: [true, "The MAC Address is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  phoneName: {
    type: Number,
    require: [true, "Phone Name is Required and must be unique"],
    unique: true,
  },
  extension: {
    type: String,
  },
  phoneMake: {
    type: String,
  },
  phoneModel: {
    type: String,
  },
  checkedOut: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    trim: true,
    maxlength: [50, "Name must be less than 50 characters"],
    default: null,
  },
  userName: {
    type: String,
    trim: true,
    maxlength: [50, "Name must be less than 50 characters"],
    default: null,
  },
  lines: {
    type: Array,
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
  election: {
    type: String,
    default: null,
  },
  prevUser: {
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
  archive: {
    type: Boolean,
    default: false,
  },
  archiveDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("DeskPhones", DeskPhoneSchema);
