// @Last Editor: SDK
// @Date: 1/13/2025
// @Status: Unfinished
// @Unfinished: deleteDockingstation,
// @Comment:

const DockingStation = require("../model/docks");
const Borrowed = require("../model/borrowedDevices");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const generateQRCode = require("../utils/generateQRCode");
const logAction = require("../utils/userAction");

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");

// @desc    Get all dockingstations
// @route   GET /api/v1/
// @access  Public
exports.getAllDockingStations = asyncHandler(async (req, res, next) => {
  const dockingStations = await DockingStation.find({});

  res.status(200).json({
    success: true,
    dockingStations,
  });
});

// @desc    Get checked out docking station inventory
// @route   GET /api/v1/dockingstations/inventory
// @access  Public
exports.getDockingstationInventory = asyncHandler(async (req, res, next) => {
  const dockingStations = await DockingStation.find({ checkedOut: true });

  const checkedOutDocks = dockingStations.map((item) => {
    const {
      _id,
      dockingStationSerial,
      dockingStationMake,
      dockingStationModel,
      userName,
      location,
      division,
      lastUpdated,
    } = item;
    return {
      id: _id,
      type: "docks",
      serial: dockingStationSerial,
      make: dockingStationMake,
      model: dockingStationModel,
      user: userName,
      location,
      division,
      lastUpdated,
    };
  });

  res.status(200).json({
    success: true,
    data: checkedOutDocks,
  });
});

// @desc    Get single dockingstations
// @route   GET /api/v1/:id
// @access  Public
exports.getDockingStation = asyncHandler(async (req, res) => {
  console.log(req.params);
  const dock = await DockingStation.findOne({ _id: req.params.id });
  // console.log(computer);
  res.status(200).json({
    success: true,
    data: dock,
  });
});

// @desc    Add a new Docking Station
// @route   POST /api/v1/dockingstations/adddockingstation
// @access  Public
// @lookup  Finished
exports.addDockingStation = asyncHandler(async (req, res, next) => {
  try {
    console.log("REQ.BODY", req.body);

    const { dockSerial, dockMake, dockModel } = req.body;

    if (!dockSerial || !dockMake || !dockModel) {
      return next(
        new ErrorResponse(
          "Dockingstation serial, make, and model are all required",
          400
        )
      );
    }

    // Check if serial exists in borrowed devices
    let checkBorrowed = await Borrowed.find({
      serial: dockSerial,
    });

    if (checkBorrowed.length > 0) {
      return next(
        new ErrorResponse(
          `Serial: ${req.body.dockSerial} already exists in ITAM loaners.`,
          400
        )
      );
    }

    const data = {
      dockingStationSerial: dockSerial.toUpperCase(),
      dockingStationMake: dockMake,
      dockingStationModel: dockModel,
      editedBy: req.user.email,
    };

    console.log("DOCK DATA", data);

    let dock = await DockingStation.create(data);

    await createDirectoryEntry(
      data.dockingStationSerial,
      "Inventory",
      "docks",
      dock._id
    );

    await logAction({
      action: "inventory",
      type: "docks",
      referenceId: dock._id,
      serial: data.dockingStationSerial,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      dock,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Inventory Dock and Checkout
// @route   POST /dockingstations/adddock/checkout
// @access  Public
// @lookup  Finished
exports.addDockAndCheckout = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      dockSerial,
      dockMake,
      dockModel,
      userName,
      division,
      manager,
      description,
      location,
    } = req.body;

    if (
      !dockSerial ||
      !dockMake ||
      !dockModel ||
      !division ||
      !manager ||
      !userName
    ) {
      return next(new ErrorResponse(`Please enter all required fields`, 400));
    }

    let checkITAM = await Borrowed.find({ serial: dockSerial });

    if (checkITAM.length > 0) {
      return next(
        new ErrorResponse(`Serial: ${dockSerial} already in ITAM loaners.`, 400)
      );
    }

    let data = {
      dockingStationSerial: dockSerial.toUpperCase(),
      dockingStationMake: dockMake,
      dockingStationModel: dockModel,
      userName: userName.toLowerCase(),
      division,
      manager,
      location,
      description,
      checkedOut: true,
      checkedOutDate: new Date(),
      editedBy: req.user.email,
    };

    // console.log("INVENTORY & CHECKOUT DOCK", data);
    let dock = await DockingStation.create(data);

    // Add Device to Lookup
    await createDirectoryEntry(
      data.dockingStationSerial,
      data.userName,
      "docks",
      dock._id
    );
    // Log Inventory Action
    await logAction({
      action: "inventory",
      type: "docks",
      referenceId: dock._id,
      serial: data.dockingStationSerial,
      receiver: "Inventory",
      author: req.user.email,
    });
    // Log Checkout Action
    await logAction({
      action: "checkout",
      type: "docks",
      referenceId: dock._id,
      serial: data.dockingStationSerial,
      receiver: data.username,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// @desc    Check In Docking Station
// @route   PUT /api/v1/dockingstations/:id
// @access  Public
// @lookup  Finished
exports.checkInDockingStation = async (req, res, next) => {
  try {
    console.log("Updating Dockingstation");
    let dock = await DockingStation.findById(req.params.id);
    // console.log(req.body);
    // console.log(dock);
    if (!dock) {
      return next(
        new ErrorResponse(
          `Dockingstation with id:${req.params.id} not found.`,
          404
        )
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
      prevUser: dock.userName,
      checkedOutDate: null,
      checkedInDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };
    // console.log(data);
    dock = await DockingStation.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkin",
      type: "docks",
      referenceId: req.params.id,
      serial: dock.dockingStationSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// @desc    Check Out Docking Station
// @route   /api/v1/dockingstations
// @access  Public
// @lookup  Finished
exports.checkOutDockingStation = asyncHandler(async (req, res, next) => {
  try {
    const { name, manager, division, election, location, comment } = req.body;

    console.log("Checking Out Dockingstation");
    console.log(req.body);

    if (!name || !manager || !division) {
      return next(
        new ErrorResponse(
          `Username, election, division, and manager are all required fields`,
          400
        )
      );
    }

    let dock = await DockingStation.findById(req.params.id);

    if (!dock) {
      return next(
        new ErrorResponse(`Dock with id:${req.params.id} not found.`, 404)
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
    console.log(data);

    dock = await DockingStation.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkout",
      type: "docks",
      referenceId: req.params.id,
      serial: dock.dockingStationSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Update Docking Station
// @route   /api/v1/dockingstations/update/id
// @access  Public
// @lookup  Finished
exports.updateInventoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
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
      !description
    ) {
      return next(new ErrorResponse(`Cannot Update Dockingstation.`, 404));
    }

    let data = {
      dockingStationMake: make,
      dockingStationModel: model,
      userName: userName.toLowerCase(),
      division,
      location,
      manager,
      lastUpdated: new Date(),
      editedBy: req.user.email,
      description: comment,
    };
    // console.log(data);
    // delete empty object keys
    for (let propName in data) {
      console.log(propName);
      if (data[propName] === "" || data[propName] === null) {
        delete data[propName];
      }
    }

    // check for phone in database
    let dock = await DockingStation.findById(req.params.id);

    if (!dock) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 404)
      );
    }

    dock = await DockingStation.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // console.log(dock);

    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    // Log Action
    await logAction({
      action: "edit",
      type: "docks",
      referenceId: dock._id,
      serial: dock.dockingStationSerial,
      receiver: dock.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Delete Docking Station
// @route
// @access  Public
// @lookup  Unfinished
exports.deleteDockingStation = async (req, res, next) => {
  try {
    // const dock = await DockingStation.findById(req.params.id);

    const dock = await DockingStation.findByIdAndDelete(req.params.id);

    if (!dock) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 401)
      );
    }

    // Remove Device from Lookup
    await deleteDirectoryEntry(req.params.id);

    // Log Action
    // await logAction({
    //   action: "delete",
    //   type: "docks",
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
};

// @desc    Update Teleworking
// @route   POST dockingstations/update/telework/${this.props.id}
// @access  Public
exports.updateTeleWork = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body);
    let dock = await DockingStation.findById(req.params.id);

    if (!dock) {
      return next(
        new ErrorResponse(
          `Dockingstation with id:${req.params.id} not found.`,
          401
        )
      );
    }

    let data = {
      teleWork: req.body.teleWork,
      teleWorkStartDate: req.body.startDate,
      teleWorkEndDate: req.body.endDate,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    dock = await DockingStation.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    // console.log(data);

    await logAction({
      action: "telework",
      type: "docks",
      referenceId: dock._id,
      serial: dock.monitorSerial,
      receiver: dock.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Add Tag to item
// @route   PUT dockingstations/tag/add/:id
// @access  Public
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for computer
    let dock = await DockingStation.find({ _id: id });

    // check for computer
    if (!dock) {
      return next(
        new ErrorResponse(`The dock with id ${id} cannot be found.`, 400)
      );
    }

    // Check that new tag does not already exist
    if (dock[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    dock = await DockingStation.findByIdAndUpdate(
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
      type: "docks",
      referenceId: dock._id,
      serial: dock.monitorSerial,
      receiver: dock.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Delete Tag from item
// @route   PUT dockingstations/tag/delete/:id
// @access  Public
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let dock = await DockingStation.findOne({ _id: id });

    if (!dock) {
      return next(
        new ErrorResponse(
          `The dockingstation with id ${id} cannot be found.`,
          400
        )
      );
    }

    dock = await DockingStation.findByIdAndUpdate(
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
      type: "docks",
      referenceId: dock._id,
      serial: dock.monitorSerial,
      receiver: dock.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a Dockingstation
// @route   PUT dockingstations/archive/:id
// @access  Public
exports.archiveDockingstation = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving Dock");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let dock = await DockingStation.findOne({ _id: id });

    if (!dock) {
      return next(
        new ErrorResponse(
          `The dockingstation with id ${id} cannot be found.`,
          400
        )
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
      data.userName = "In Inventory";
      data.location = "Inventory";
      val = "Inventory";
    }

    // console.log("DATA:", data);

    dock = await DockingStation.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log("UPDATED DOCK", dock);

    await updateDirectoryUsername(req.params.id, val);

    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "docks",
      referenceId: req.params.id,
      serial: dock.dockingStationSerial,
      receiver: "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: dock,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Generate and Return Dockingstation QR Code
// @route   GET dockingstations/qr/:id
// @access  Public
exports.dockQRCode = asyncHandler(async (req, res, next) => {
  try {
    console.log("GeneratiNG QR Code");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;

    // let computer = await Computers.findOne({ _id: id });

    // if (!computer) {
    //   return next(
    //     new ErrorResponse(`The computer with id ${id} cannot be found.`, 400)
    //   );
    // }

    const qrCodeUrl = await generateQRCode(id);

    // console.log("DATA:", data

    res.status(200).json({
      success: true,
      data: qrCodeUrl,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});
