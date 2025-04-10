const Computers = require("../model/computer");
const Borrowed = require("../model/borrowedDevices");
const asyncHandler = require("../middleware/async");
const generateQRCode = require("../utils/generateQRCode");
const logAction = require("../utils/userAction");
// const { nextLine } = require('pdf-lib');

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");

const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all computers
// @route   GET /api/v1/computers
// @access  Public
exports.getComputers = asyncHandler(async (req, res, next) => {
  // const computers = await Computers.find({});

  // res.status(200).json(res.advancedResults);
  try {
    const computers = await Computers.find({});

    res.status(200).json({
      success: true,
      data: computers,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Get all checked out computers for inventory screen
// @route   GET /api/v1/computers/inventory
// @access  Public
exports.getInventoryComputers = asyncHandler(async (req, res, next) => {
  const computers = await Computers.find({ checkedOut: true, archive: false });

  const checkedOutComputers = computers.map((item) => {
    const {
      _id,
      computerSerial,
      computerName,
      computerMake,
      computerModel,
      userName,
      location,
      lastUpdated,
    } = item;
    return {
      id: _id,
      type: "computers",
      serial: computerSerial,
      name: computerName,
      make: computerMake,
      model: computerModel,
      user: userName,
      location,
      lastUpdated,
    };
  });

  res.status(200).json({
    success: true,
    data: checkedOutComputers,
  });
});

// @desc    Get single computer from Inventory
// @route   Get /api/v1/computers/:id
// @access  Public
exports.getComputer = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  const computer = await Computers.findOne({ _id: req.params.id });
  // console.log(computer);
  res.status(200).json({
    success: true,
    data: computer,
  });
});

// @desc    Add computer to Inventory
// @route   POST /api/v1/computers
// @access  Public
// @status  Done
// @lookup  Finished
// @comment
exports.addComputer = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);

    const { computerSerial, computerMake, computerModel, type } = req.body;

    if (!computerSerial || !computerMake || !computerModel || !type) {
      return next(
        new ErrorResponse(
          `Computer serial, make, model, and type are all required fields`,
          400
        )
      );
    }

    const systemName = req.body.computerSerial.slice(-6);

    if (type === "Desktop") {
      let computerName = "ROVWS" + systemName;
      req.body.computerName = computerName;
    } else if (type === "Laptop") {
      let computerName = "ROVLT" + systemName;
      req.body.computerName = computerName;
    }

    const data = {
      computerSerial: computerSerial.toUpperCase(),
      computerMake: computerMake,
      computerModel: computerModel,
      computerName: req.body.computerName,
      editedBy: req.user.email,
    };

    // Check if serial already exists in borrowed devices
    let checkBorrowed = await Borrowed.find({ serial: data.computerSerial });

    if (checkBorrowed.length > 0) {
      return next(
        new ErrorResponse(
          `Serial: ${req.body.computerSerial} already exists in ITAM loaners.`,
          400
        )
      );
    }

    const computer = await Computers.create(data);

    await createDirectoryEntry(
      data.computerSerial,
      "Inventory",
      "computers",
      computer._id
    );

    await logAction({
      action: "inventory",
      type: "computers",
      referenceId: computer._id,
      serial: data.computerSerial,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error.name);
    next(error);
  }
});

// @desc    CheckOut computer from Inventory
// @route   PUT /api/v1/computers/:id
// @access  Public
exports.checkOutComputer = asyncHandler(async (req, res, next) => {
  try {
    const { name, manager, division, election, location, comment } = req.body;
    console.log("Updating Computer");
    console.log("Computers", req.params.id);
    let computer = await Computers.findById(req.params.id);
    console.log(req.body);

    if (!name || !manager || !division) {
      return next(
        new ErrorResponse(
          `Username, election, division, and manager are all required fields`,
          400
        )
      );
    }

    // console.log(computer);
    if (!computer) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 404)
      );
    }

    let data = {
      checkedOut: true,
      userName: name.toLowerCase(),
      division: division,
      election: election,
      manager: manager,
      location: location,
      description: comment,
      checkedInDate: null,
      checkedOutDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    // console.log(data);

    computer = await Computers.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    await logAction({
      action: "checkout",
      type: "computers",
      referenceId: req.params.id,
      serial: computer.computerSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Check In Computer into Inventory
// @route   PUT /api/v1/computers/checkin/:id
// @access  Public
// @status  Done
// @lookup  Finished
// @comment
exports.checkInComputer = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checking In Computer");
    let computer = await Computers.findById(req.params.id);

    if (!computer) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 404)
      );
    }

    let data = {
      checkedOut: false,
      userName: req.body.setLocation,
      division: null,
      manager: null,
      description: null,
      election: null,
      location: req.body.setLocation,
      prevUser: computer.userName,
      checkedOutDate: null,
      checkedInDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    // console.log(data);

    computer = await Computers.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    await logAction({
      action: "checkin",
      type: "computers",
      referenceId: req.params.id,
      serial: computer.computerSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Delete computer from Inventory
// @route   DELETE /api/v1/computers/:id
// @access  Public
exports.deleteComputer = async (req, res, next) => {
  console.log("DELETING COMPUTER");
  try {
    // const computer = await Computers.findById(req.params.id);

    const computer = await Computers.findByIdAndDelete(req.params.id);

    if (!computer) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 401)
      );
    }

    // Remove Device from Lookup
    await deleteDirectoryEntry(req.params.id);

    // // Log Action
    // await logAction({
    //   action: "delete",
    //   type: "computers",
    //   referenceId: req.params.id,
    //   serial: computer.computerSerial,
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

// @desc    Inventory Computer and Checkout
// @route   POST /computers/addcomputer/checkout
// @access  Public
exports.inventoryComputerAndCheckout = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      computerSerial,
      computerMake,
      computerModel,
      division,
      manager,
      userName,
      location,
      description,
      type,
    } = req.body;

    if (
      !computerSerial ||
      !computerMake ||
      !computerModel ||
      !division ||
      !manager ||
      !userName
    ) {
      return next(new ErrorResponse(`Please enter all required fields`, 400));
    }
    let checkITAM = await Borrowed.find({ serial: computerSerial });

    if (checkITAM.length > 0) {
      return next(
        new ErrorResponse(
          `Serial: ${computerSerial} already in ITAM loaners.`,
          400
        )
      );
    }

    let data = {
      computerSerial: computerSerial.toUpperCase(),
      computerMake,
      computerModel,
      division,
      manager,
      userName: userName.toLowerCase(),
      location,
      description,
      checkedOut: true,
      checkedOutDate: new Date(),
      editedBy: req.user.email,
    };
    const systemName = computerSerial.slice(4);

    if (type === "Desktop") {
      let computerName = "ROVWS" + systemName;
      data.computerName = computerName;
    } else if (type === "Laptop") {
      let computerName = "ROVLT" + systemName;
      data.computerName = computerName;
    }

    let computer = await Computers.create(data);

    // Add Device to Lookup
    await createDirectoryEntry(
      data.computerSerial,
      data.userName,
      "computers",
      computer._id
    );

    // Log Inventory Action
    await logAction({
      action: "inventory",
      type: "computers",
      referenceId: computer._id,
      serial: data.computerSerial,
      receiver: "Inventory",
      author: req.user.email,
    });

    // Log Checkout Action
    await logAction({
      action: "checkout",
      type: "computers",
      referenceId: computer._id,
      serial: data.computerSerial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Update Computer in Inventory
// @route   PUT /computers/update/:id
// @access  Private
// @status  Done
// @lookup  Finished
// @comment
exports.updateInventoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log("Updating Computer");
    console.log(req.body);
    console.log(req.params.id);

    const {
      computerName,
      make,
      model,
      userName,
      division,
      manager,
      location,
      election,
      comment,
    } = req.body;

    if (
      !computerName &&
      !make &&
      !model &&
      !userName &&
      !division &&
      !manager &&
      !location &&
      !election &&
      !comment
    ) {
      return next(
        new ErrorResponse(
          `Cannot Update Computer. Enter all fields or a single field to edit.`,
          404
        )
      );
    }

    let data = {
      computerName,
      computerMake: make,
      computerModel: model,
      userName: userName.toLowerCase(),
      division,
      manager,
      location,
      election,
      description: comment,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    console.log("DATA:", data);
    for (let propName in data) {
      // console.log(propName);
      if (data[propName] === "" || data[propName] === null) {
        delete data[propName];
      }
    }

    console.log("CLEANED DATA", data);

    let computer = await Computers.findById(req.params.id);

    if (!computer) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 404)
      );
    }

    computer = await Computers.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    // Log Action
    await logAction({
      action: "edit",
      type: "computers",
      referenceId: computer._id,
      serial: computer.computerSerial,
      receiver: computer.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (error) {
    console.log(error);
    next(err);
  }
});

// @desc    Update Teleworking
// @route   POST computers/update/telework/:id
// @access  Public
exports.updateTeleWork = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const { teleWork, startDate, endDate } = req.body;

    if (teleWork && !startDate && !endDate) {
      return next(
        new ErrorResponse(`Start & End Date are Required for Telework`, 401)
      );
    }
    let computer = await Computers.findById(req.params.id);

    if (!computer) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 401)
      );
    }

    let data = {
      teleWork: teleWork,
      teleWorkStartDate: startDate,
      teleWorkEndDate: endDate,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    computer = await Computers.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Log Action
    await logAction({
      action: "telework",
      type: "computers",
      referenceId: computer._id,
      serial: computer.computerSerial,
      receiver: computer.userName,
      author: req.user.email,
    });

    // console.log(data);
    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Add Tag to item
// @route   PUT computers/tag/add/:id
// @access  Public
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    console.log("Adding item to tags array");
    // Output params _id
    console.log("ID", req.params.id);

    // output req.body
    console.log("BODY", req.body.tag);

    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for computer
    let computer = await Computers.find({ _id: id });
    console.log("COMPUTER", computer);
    // check for computer
    if (!computer) {
      return next(
        new ErrorResponse(`The computer with id ${id} cannot be found.`, 400)
      );
    }

    // Check that new tag does not already exist
    if (computer[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    computer = await Computers.findByIdAndUpdate(
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

    // console.log("UPDATED COMPUTER", computer);

    // Log Action
    await logAction({
      action: "tag",
      type: "computers",
      referenceId: computer._id,
      serial: computer.computerSerial,
      receiver: computer.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Remove Tag from item
// @route   PUT computers/tag/delete/:id
// @access  Public
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    console.log("Deleting item from tags array");
    console.log("ID", req.params.id);
    console.log("BODY", req.body.tag);

    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let computer = await Computers.findOne({ _id: id });

    if (!computer) {
      return next(
        new ErrorResponse(`The computer with id ${id} cannot be found.`, 400)
      );
    }

    computer = await Computers.findByIdAndUpdate(
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

    console.log("UPDATED COMPUTER", computer);

    // Log Action
    await logAction({
      action: "tag",
      type: "computers",
      referenceId: computer._id,
      serial: computer.computerSerial,
      receiver: computer.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a Computer
// @route   PUT computers/archive/:id
// @access  Public
exports.archiveComputer = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving Computer");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let computer = await Computers.findOne({ _id: id });

    if (!computer) {
      return next(
        new ErrorResponse(`The computer with id ${id} cannot be found.`, 400)
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

    computer = await Computers.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log("UPDATED COMPUTER", computer);
    await updateDirectoryUsername(req.params.id, val);

    // Log Action
    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "computers",
      referenceId: req.params.id,
      serial: computer.computerSerial,
      receiver: archive ? "Inventory" : "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Generate and Return Accessory QR Code
// @route   PUT accessories/qr/:id
// @access  Public
exports.computerQRCode = asyncHandler(async (req, res, next) => {
  try {
    console.log("GeneratiNG QR Code");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;

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
