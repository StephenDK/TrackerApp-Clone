const Computers = require("../model/computer");
const Monitors = require("../model/monitors");
const Phones = require("../model/phone");
const Docks = require("../model/dockingStations");
const Accessories = require("../model/accessories");
const BorrowedDevices = require("../model/borrowedDevices");
const DeskPhones = require("../model/deskPhone");

const asyncHandler = require("../middleware/async");

// const { nextLine } = require('pdf-lib');

const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all devices
// @route   GET /api/v1/devices/
// @access  Public
exports.getInventoryDevices = asyncHandler(async (req, res, next) => {
  const computers = await Computers.find({ checkedOut: false, archive: false });
  const phones = await Phones.find({ checkedOut: false, archive: false });
  const monitors = await Monitors.find({ checkedOut: false, archive: false });
  const docks = await Docks.find({ checkedOut: false, archive: false });
  const accessories = await Accessories.find({
    checkedOut: false,
    archive: false,
  });
  const itam = await BorrowedDevices.find({
    checkedOut: false,
    archive: false,
  });
  const deskPhones = await DeskPhones.find({
    checkedOut: false,
    archive: false,
  });

  // console.log(data.length);
  const newComputers = computers.map((item) => {
    const { _id, computerSerial, computerMake, computerModel, lastUpdated } =
      item;
    return {
      id: _id,
      type: "computers",
      serial: computerSerial,
      make: computerMake,
      model: computerModel,
      lastUpdated,
    };
  });
  const newPhones = phones.map((item) => {
    const { _id, phoneIMEI, phoneMake, phoneModel, lastUpdated } = item;
    return {
      id: _id,
      type: "phones",
      serial: phoneIMEI,
      make: phoneMake,
      model: phoneModel,
      lastUpdated,
    };
  });

  const newMonitors = monitors.map((item) => {
    const { _id, monitorSerial, monitorMake, monitorModel, lastUpdated } = item;
    return {
      id: _id,
      type: "monitors",
      serial: monitorSerial,
      make: monitorMake,
      model: monitorModel,
      lastUpdated,
    };
  });

  const newDocks = docks.map((item) => {
    const {
      _id,
      dockingStationSerial,
      dockingStationMake,
      dockingStationModel,
      lastUpdated,
    } = item;
    return {
      id: _id,
      type: "docks",
      serial: dockingStationSerial,
      make: dockingStationMake,
      model: dockingStationModel,
      lastUpdated,
    };
  });

  const newDeskPhones = deskPhones.map((item) => {
    const { _id, phoneMAC, phoneMake, phoneModel, lastUpdated } = item;
    return {
      id: _id,
      type: "deskphones",
      serial: phoneMAC,
      make: phoneMake,
      model: phoneModel,
      lastUpdated,
    };
  });

  const newAccessories = accessories.map((item) => {
    const { _id, barcode, serial, make, model, lastUpdated } = item;
    return {
      id: _id,
      type: "accessory",
      serial: serial === null || serial === "" ? barcode : serial,
      make: make,
      model: model,
      lastUpdated,
    };
  });

  const newItam = itam.map((item) => {
    const { _id, serial, make, model, lastUpdated } = item;
    return {
      id: _id,
      type: "itam",
      serial: serial,
      make: make,
      model: model,
      lastUpdated,
    };
  });

  const inventoryItems = [
    ...newComputers,
    ...newPhones,
    ...newMonitors,
    ...newDocks,
    ...newDeskPhones,
    ...newAccessories,
    ...newItam,
  ];

  res.status(200).json({
    success: true,
    data: inventoryItems,
  });
});

// @desc    Get all devices
// @route   GET /api/v1/devices/archive
// @access  Public
exports.getArchivedDevices = asyncHandler(async (req, res, next) => {
  const computers = await Computers.find({ archive: true });
  const phones = await Phones.find({ archive: true });
  const monitors = await Monitors.find({ archive: true });
  const docks = await Docks.find({ archive: true });
  const accessories = await Accessories.find({
    archive: true,
  });
  const itam = await BorrowedDevices.find({
    archive: true,
  });
  const deskPhones = await DeskPhones.find({
    archive: true,
  });

  // console.log(data.length);
  const newComputers = computers.map((item) => {
    const { _id, computerSerial, computerMake, computerModel, archiveDate } =
      item;
    return {
      id: _id,
      type: "computers",
      serial: computerSerial,
      make: computerMake,
      model: computerModel,
      archiveDate,
    };
  });
  const newPhones = phones.map((item) => {
    const { _id, phoneIMEI, phoneMake, phoneModel, archiveDate } = item;
    return {
      id: _id,
      type: "phones",
      serial: phoneIMEI,
      make: phoneMake,
      model: phoneModel,
      archiveDate,
    };
  });

  const newMonitors = monitors.map((item) => {
    const { _id, monitorSerial, monitorMake, monitorModel, archiveDate } = item;
    return {
      id: _id,
      type: "monitors",
      serial: monitorSerial,
      make: monitorMake,
      model: monitorModel,
      archiveDate,
    };
  });

  const newDocks = docks.map((item) => {
    const {
      _id,
      dockingStationSerial,
      dockingStationMake,
      dockingStationModel,
      archiveDate,
    } = item;
    return {
      id: _id,
      type: "docks",
      serial: dockingStationSerial,
      make: dockingStationMake,
      model: dockingStationModel,
      archiveDate,
    };
  });

  const newDeskPhones = deskPhones.map((item) => {
    const { _id, phoneMAC, phoneMake, phoneModel, archiveDate } = item;
    return {
      id: _id,
      type: "deskphones",
      serial: phoneMAC,
      make: phoneMake,
      model: phoneModel,
      archiveDate,
    };
  });

  const newAccessories = accessories.map((item) => {
    const { _id, barcode, serial, make, model, archiveDate } = item;
    return {
      id: _id,
      type: "accessory",
      serial: serial === null || serial === "" ? barcode : serial,
      make: make,
      model: model,
      archiveDate,
    };
  });

  const newItam = itam.map((item) => {
    const { _id, serial, make, model, archiveDate } = item;
    return {
      id: _id,
      type: "itam",
      serial: serial,
      make: make,
      model: model,
      archiveDate,
    };
  });

  const inventoryItems = [
    ...newComputers,
    ...newPhones,
    ...newMonitors,
    ...newDocks,
    ...newDeskPhones,
    ...newAccessories,
    ...newItam,
  ];

  res.status(200).json({
    success: true,
    data: inventoryItems,
  });
});

exports.getRecentInventoried = asyncHandler(async (req, res, next) => {
  const computer = await Computers.find({}).sort({ _id: -1 }).limit(1);
  const phone = await Phones.find({}).sort({ _id: -1 }).limit(1);
  const monitor = await Monitors.find({}).sort({ _id: -1 }).limit(1);
  const dock = await Docks.find({}).sort({ _id: -1 }).limit(1);

  res.status(200).json({
    success: true,
    computer,
    phone,
    monitor,
    dock,
  });
});
