// @Last Editor: SDK
// @Date: 1/12/2025
// @Status: Unfinished
// @Unfinished: DeleteMonitor,
// @Comment:

const Monitors = require("../model/monitors");
const Borrowed = require("../model/borrowedDevices");
const asyncHandler = require("../middleware/async");
const generateQRCode = require("../utils/generateQRCode");
// const { nextLine } = require('pdf-lib');

// Log Action Function
const logAction = require("../utils/userAction");

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");

const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all monitors
// @route   GET /api/v1/monitors
// @access  Public
exports.getMonitors = asyncHandler(async (req, res, next) => {
  const monitors = await Monitors.find({});

  res.status(200).json({
    success: true,
    monitors,
  });
});

// @desc    Get monitor inventory
// @route   GET /api/v1/monitors/inventory
// @access  Public
exports.getInventoryMonitors = asyncHandler(async (req, res, next) => {
  const monitors = await Monitors.find({ checkedOut: true });

  const checkedOutMonitors = monitors.map((item) => {
    const {
      _id,
      monitorSerial,
      monitorMake,
      monitorModel,
      userName,
      location,
      division,
      lastUpdated,
    } = item;
    return {
      id: _id,
      type: "monitors",
      serial: monitorSerial,
      make: monitorMake,
      model: monitorModel,
      user: userName,
      location,
      division,
      lastUpdated,
    };
  });

  res.status(200).json({
    success: true,
    data: checkedOutMonitors,
  });
});

// @desc    Get single monitor from Inventory
// @route   api/v1/monitors/:id
// @access  Public
exports.getMonitor = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  const monitor = await Monitors.findOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: monitor,
  });
});

// @desc    Add Monitor to Inventory
// @route   POST monitors/
// @access  Public
// @lookup  Finished
exports.inventoryMonitor = asyncHandler(async (req, res, next) => {
  try {
    const { monitorSerial, monitorMake, monitorModel } = req.body;

    if (!monitorSerial || !monitorMake || !monitorModel) {
      return next(
        new ErrorResponse(
          `Monitor serial, make, model are all required fields`,
          400
        )
      );
    }

    // Check if serial already exists in borrowed devices
    let checkBorrowed = await Borrowed.find({ serial: monitorSerial });

    if (checkBorrowed.length > 0) {
      return next(
        new ErrorResponse(
          `Serial: ${req.body.monitorSerial} already in ITAM loaners.`,
          400
        )
      );
    }
    let data = {
      monitorSerial: monitorSerial.toUpperCase(),
      monitorMake,
      monitorModel,
      editedBy: req.user.email,
    };

    const monitor = await Monitors.create(data);

    await createDirectoryEntry(
      data.monitorSerial,
      "Inventory",
      "monitors",
      monitor._id
    );

    await logAction({
      action: "inventory",
      type: "monitors",
      referenceId: monitor._id,
      serial: data.monitorSerial,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      monitor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Check Out Monitor
// @route   PUT /api/v1/monitors/:id
// @access  Public
// @lookup  Finished
exports.checkOutUpdateMonitor = asyncHandler(async (req, res, next) => {
  try {
    const { name, manager, division, comment, location, election } = req.body;

    console.log("Checking Out Monitor");
    console.log(req.body);

    if (!name || !manager || !division || !election) {
      return next(
        new ErrorResponse(
          `Username, election, division, and manager are all required fields`,
          400
        )
      );
    }

    let monitor = await Monitors.findById(req.params.id);

    if (!monitor) {
      return next(
        new ErrorResponse(`Monitor with id:${req.params.id} not found.`, 404)
      );
    }

    let data = {
      checkedOut: true,
      userName: name.toLowerCase(),
      division,
      election,
      manager,
      location,
      description: comment,
      checkedOutDate: new Date(),
      checkedInDate: null,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    monitor = await Monitors.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkout",
      type: "monitors",
      referenceId: req.params.id,
      serial: monitor.monitorSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Check In Monitor
// @route   PUT /api/v1/monitors/:id
// @access  Public
// @lookup  Finished
exports.checkInMonitor = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checking In Monitor");
    console.log(req.body);

    let monitor = await Monitors.findById(req.params.id);

    if (!monitor) {
      return next(
        new ErrorResponse(`Monitor with id:${req.params.id} not found.`, 404)
      );
    }

    let data = {
      checkedOut: false,
      userName: req.body.setLocation,
      division: null,
      manager: null,
      election: null,
      description: null,
      location: req.body.setLocation,
      prevUser: monitor.userName,
      checkedOutDate: null,
      checkedInDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    monitor = await Monitors.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkin",
      type: "monitors",
      referenceId: req.params.id,
      serial: monitor.monitorSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Delete monitor from Inventory
// @route   DELETE /api/v1/monitors/:id
// @access  Public
// @lookup  Finished
// @action  Incomplete
exports.deleteMonitor = asyncHandler(async (req, res, next) => {
  try {
    console.log("Deleting Monitor");
    // const monitor = await Monitors.findByIdAndDelete(req.params.id);

    const monitor = await Monitors.findByIdAndDelete(req.params.id);

    if (!monitor) {
      return next(
        new ErrorResponse(`Monitor with id:${req.params.id} not found.`, 401)
      );
    }

    // Remove Device from Lookup
    await deleteDirectoryEntry(req.params.id);

    // Log Action
    // await logAction({
    //   action: "delete",
    //   type: "monitors",
    //   referenceId: req.params.id,
    //   serial: monitor.monitorSerial,
    //   receiver: "Inventory",
    //   author: req.user.email,
    // });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Inventory and checkout monitor
// @route   POST /api/v1/inventory/checkout
// @access  Public
// @lookup  Finished
// @action  Finished
exports.inventoryMonitorAndCheckout = asyncHandler(async (req, res, next) => {
  try {
    const {
      monitorSerial,
      monitorMake,
      monitorModel,
      user,
      division,
      manager,
      location,
      description,
    } = req.body;

    // Check serial and values
    if (
      !monitorSerial ||
      !monitorMake ||
      !monitorModel ||
      !user ||
      !division ||
      !manager
    ) {
      return next(new ErrorResponse(`All fields are required.`, 400));
    }

    // Check for duplicate serials in borrowed devices
    let checkLoaners = await Borrowed.find({ serial: monitorSerial });

    if (checkLoaners.length > 0) {
      return next(
        new ErrorResponse(
          `Serial: ${monitorSerial} already in ITAM loaners.`,
          400
        )
      );
    }

    let data = {
      monitorSerial: monitorSerial.toUpperCase(),
      monitorMake,
      monitorModel,
      userName: user.toLowerCase(),
      division,
      manager,
      location,
      description,
      checkedOut: true,
      checkedOutDate: new Date(),
      editedBy: req.user.email,
    };

    // console.log(data);
    const monitor = await Monitors.create(data);

    // Add Device to Lookup
    await createDirectoryEntry(
      data.monitorSerial,
      data.userName,
      "monitors",
      monitor._id
    );

    // Log Inventory Action
    await logAction({
      action: "inventory",
      type: "monitors",
      referenceId: monitor._id,
      serial: data.monitorSerial,
      receiver: "Inventory",
      author: req.user.email,
    });

    // Log Checkout Action
    await logAction({
      action: "checkout",
      type: "monitors",
      referenceId: monitor._id,
      serial: data.monitorSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      monitor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Update Monitor
// @route   POST /api/v1/monitors/update/:id
// @access  Public
// @lookup  Finished
// @action  Incomplete
exports.updateInventoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log("UPDATING ITEM:", req.body);

    const {
      make,
      model,
      userName,
      division,
      location,
      manager,
      election,
      comment,
    } = req.body;

    if (
      !make &&
      !model &&
      !userName &&
      !division &&
      !manager &&
      !location &&
      !election &&
      !comment
    ) {
      return next(new ErrorResponse(`Cannot Update Monitor.`, 404));
    }

    let data = {
      monitorMake: make,
      monitorModel: model,
      userName: userName.toLowerCase(),
      division,
      location,
      election,
      manager,
      lastUpdated: new Date(),
      editedBy: req.user.email,
      description: comment,
    };
    // console.log(data);
    // delete empty object keys
    for (let propName in data) {
      // console.log(propName);
      if (data[propName] === "" || data[propName] === null) {
        delete data[propName];
      }
    }

    // check for monitor in database
    let monitor = await Monitors.findById(req.params.id);

    if (!monitor) {
      return next(
        new ErrorResponse(`Monitor with id:${req.params.id} not found.`, 404)
      );
    }

    monitor = await Monitors.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // console.log(monitor);

    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    await logAction({
      action: "edit",
      type: "monitors",
      referenceId: monitor._id,
      serial: monitor.monitorSerial,
      receiver: monitor.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Update Teleworking
// @route   POST monitors/update/telework/:id
// @access  Public
// @action  Incomplete
exports.updateTeleWork = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const { teleWork, startDate, endDate } = req.body;

    if (teleWork && !startDate && !endDate) {
      return next(
        new ErrorResponse(`Start & End Date are Required for Telework`, 401)
      );
    }
    let monitor = await Monitors.findById(req.params.id);

    if (!monitor) {
      return next(
        new ErrorResponse(`Monitor with id:${req.params.id} not found.`, 401)
      );
    }

    let data = {
      teleWork: teleWork,
      teleWorkStartDate: startDate,
      teleWorkEndDate: endDate,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    monitor = await Monitors.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    // console.log(data);

    await logAction({
      action: "telework",
      type: "monitors",
      referenceId: monitor._id,
      serial: monitor.monitorSerial,
      receiver: monitor.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Add Tag to item
// @route   PUT monitors/tag/add/:id
// @access  Public
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for monitor
    let monitor = await Monitors.find({ _id: id });

    // check for monitor
    if (!monitor) {
      return next(
        new ErrorResponse(`Monitor with id ${id} cannot be found.`, 404)
      );
    }

    // Check that new tag does not already exist
    if (monitor[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    monitor = await Monitors.findByIdAndUpdate(
      id,
      {
        $push: { tags: tag },
        $set: {
          lastUpdated: new Date(),
          editedBy: req.user.email,
        },
      },
      { new: true }
    );

    await logAction({
      action: "tag",
      type: "monitors",
      referenceId: monitor._id,
      serial: monitor.monitorSerial,
      receiver: monitor.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Delete Tag from item
// @route   PUT monitors/tag/delete/:id
// @access  Public
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let monitor = await Monitors.findOne({ _id: id });

    if (!monitor) {
      return next(
        new ErrorResponse(`The monitor with id ${id} cannot be found.`, 400)
      );
    }

    monitor = await Monitors.findByIdAndUpdate(
      id,
      {
        $pull: { tags: tag },
        $set: {
          lastUpdated: new Date(),
          editedBy: req.user.email,
        },
      },
      { new: true }
    );

    await logAction({
      action: "tag",
      type: "monitors",
      referenceId: monitor._id,
      serial: monitor.monitorSerial,
      receiver: monitor.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a Monitor
// @route   PUT monitors/archive/:id
// @access  Public
// @lookup  Finished
// @action  Finished
exports.archiveMonitor = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving Monitor");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let monitor = await Monitors.findOne({ _id: id });

    if (!monitor) {
      return next(
        new ErrorResponse(`The monitor with id ${id} cannot be found.`, 400)
      );
    }

    let timeStamp = new Date();

    let data = {
      archive: true,
      archiveDate: timeStamp,
      lastUpdated: timeStamp,
      checkedOut: false,
      userName: "Archived",
      election: null,
      division: null,
      manager: null,
      location: "Archived",
      checkedOutDate: null,
      checkedInDate: null,
      teleWork: false,
      teleWorkStartDate: null,
      teleWorkEndDate: null,
      description: "This device is marked as archived",
      editedBy: req.user.email,
    };

    // If archive is true, un-archive
    if (archive) {
      data.archive = false;
      data.archiveDate = null;
      data.userName = "Inventory";
      data.location = "Inventory";
      val = "Inventory";
    }

    // console.log("DATA:", data);

    monitor = await Monitors.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    await updateDirectoryUsername(req.params.id, val);

    console.log("UPDATED MONITOR", monitor);
    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "monitors",
      referenceId: req.params.id,
      serial: monitor.monitorSerial,
      receiver: archive ? "Inventory" : "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: monitor,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Generate and Return Computer QR Code
// @route   GET monitors/qr/:id
// @access  Public
exports.getMonitorQRCode = asyncHandler(async (req, res, next) => {
  try {
    console.log("Generating QR Code");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;

    // Uncomment if you need to find the computer in a database
    // let computer = await Computers.findOne({ _id: id });

    // if (!computer) {
    //   return next(
    //     new ErrorResponse(`The computer with id ${id} cannot be found.`, 400)
    //   );
    // }

    const qrCodeUrl = await generateQRCode(id);

    res.status(200).json({
      success: true,
      data: qrCodeUrl,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});
