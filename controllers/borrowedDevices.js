const BorrowedDevices = require("../model/borrowedDevices");
const asyncHandler = require("../middleware/async");
// const { nextLine } = require('pdf-lib');
const logAction = require("../utils/userAction");

const ErrorResponse = require("../utils/errorResponse");

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");

// @desc    Get all borrowed devices
// @route   GET /api/v1/computers
// @access  Public
exports.getBorrowedDevices = asyncHandler(async (req, res, next) => {
  const borrowedDevices = await BorrowedDevices.find({});

  res.status(200).json({
    success: true,
    borrowedDevices,
  });
});

exports.getBorrowedInventory = asyncHandler(async (req, res, next) => {
  try {
    const borrowedDevices = await BorrowedDevices.find({ checkedOut: true });

    const borrowed = borrowedDevices.map((item) => {
      const {
        _id,
        serial,
        checkedOut,
        make,
        model,
        userName,
        division,
        deviceType,
        location,
        lastUpdated,
      } = item;
      return {
        id: _id,
        type: "itam",
        checkedOut,
        serial,
        make,
        model,
        user: userName,
        division,
        deviceType,
        location,
        lastUpdated,
      };
    });

    res.status(200).json({
      success: true,
      data: borrowed,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

exports.getBorrowedDevice = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params);
    let device = await BorrowedDevices.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: device,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Inventory ITAM equipment
// @route   POST /api/v1/itam/
// @access  Public
// @lookup  Finished
exports.addBorrowedDevice = asyncHandler(async (req, res, next) => {
  try {
    console.log("Adding Borrowed Device");

    let { serial, make, model, category } = req.body;

    if (!serial || !category || !make || !model) {
      return next(
        new ErrorResponse(
          "Serial, Category, make, and model are required fields",
          400
        )
      );
    }
    let data = {
      serial: serial.toUpperCase(),
      make,
      model,
      deviceType: category,
      editedBy: req.user.email,
    };
    // console.log("DATA:", data);
    const borrowedDevice = await BorrowedDevices.create(data);

    await createDirectoryEntry(
      data.serial,
      "Inventory",
      "itam",
      borrowedDevice._id
    );

    await logAction({
      action: "inventory",
      type: "itam",
      referenceId: borrowedDevice._id,
      serial: data.serial,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: borrowedDevice,
    });
  } catch (error) {
    console.log(error.name);
    next(error);
  }
});

// @desc    Check In ITAM equipment
// @route   PUT /api/v1/itam/checkin/:id
// @access  Public
exports.CheckInBorrowedItem = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.params.id);
    let borrowedDevice = await BorrowedDevices.findById(req.params.id);

    if (!borrowedDevice) {
      return next(
        new ErrorResponse(`Device with id:${req.params.id} not found.`, 404)
      );
    }

    let data = {
      checkedOut: false,
      userName: req.body.setLocation,
      division: null,
      manager: null,
      description: null,
      election: null,
      prevUser: borrowedDevice.userName,
      location: req.body.setLocation,
      checkedOutDate: null,
      checkedInDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    borrowedDevice = await BorrowedDevices.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    await logAction({
      action: "checkin",
      type: "itam",
      referenceId: req.params.id,
      serial: borrowedDevice.serial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: borrowedDevice,
    });
  } catch (error) {
    console.log(error);
    next(err);
  }
});

// @desc    Check Out ITAM equipment
// @route   PUT /api/v1/itam/:id
// @access  Public
exports.checkOutBorrowedDevice = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checking Out Borrowed Device");
    const { name, manager, division, election, location, comment } = req.body;

    console.log(req.body);

    if (!name || !manager || !division || !election) {
      return next(
        new ErrorResponse(
          `User, division, and manager are all required fields`,
          400
        )
      );
    }

    let borrowedDevice = await BorrowedDevices.findById(req.params.id);

    if (!borrowedDevice) {
      return next(
        new ErrorResponse(`Device with id:${req.params.id} not found.`, 404)
      );
    }
    let data = {
      checkedOut: true,
      userName: name.toLowerCase(),
      manager,
      division,
      election,
      location,
      description: comment,
      checkedInDate: null,
      checkedOutDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    console.log("DATA ", data);

    borrowedDevice = await BorrowedDevices.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    await logAction({
      action: "checkout",
      type: "itam",
      referenceId: req.params.id,
      serial: borrowedDevice.serial,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: borrowedDevice,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Delete ITAM equipment from Inventory
// @route   DELETE /api/v1/itam/:id
// @access  Public
exports.deleteBorrowedDevices = asyncHandler(async (req, res, next) => {
  try {
    console.log("DELETING DEVICE");
    // const device = await BorrowedDevices.findById(req.params.id);

    const borrowedDevice = await BorrowedDevices.findByIdAndDelete(
      req.params.id
    );

    if (!borrowedDevice) {
      return next(
        new ErrorResponse(
          `ITAM device with id:${req.params.id} not found.`,
          401
        )
      );
    }

    // Remove Device from Lookup
    await deleteDirectoryEntry(req.params.id);

    // await logAction({
    //   action: "delete",
    //   type: "itam",
    //   referenceId: req.params.id,
    //   serial: borrowedDevice.serial,
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

// @desc    Update ITAM Device in Inventory
// @route   PUT /itam/update/:id
// @access  Private
exports.updateBorrowedInventoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log("Updating ITAM Device");
    console.log(req.body);
    console.log(req.params.id);
    const {
      make,
      model,
      userName,
      division,
      manager,
      election,
      location,
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
      return next(new ErrorResponse(`Cannot Update ITAM device.`, 404));
    }

    let data = {
      make,
      model,
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
      console.log(propName);
      if (data[propName] === "" || data[propName] === null) {
        delete data[propName];
      }
    }

    console.log(data);

    let borrowedDevice = await BorrowedDevices.findById(req.params.id);

    if (!borrowedDevice) {
      return next(
        new ErrorResponse(
          `ITAM device with id:${req.params.id} not found.`,
          404
        )
      );
    }

    borrowedDevice = await BorrowedDevices.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    await logAction({
      action: "edit",
      type: "itam",
      referenceId: borrowedDevice._id,
      serial: borrowedDevice.serial,
      receiver: borrowedDevice.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: borrowedDevice,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});


// @desc    Update Teleworking
// @route   POST /itam/update/telework/:id
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
    let borrowedDevice = await BorrowedDevices.findById(req.params.id);

    if (!borrowedDevice) {
      return next(
        new ErrorResponse(
          `ITAM device with id:${req.params.id} not found.`,
          401
        )
      );
    }

    let data = {
      teleWork: teleWork,
      teleWorkStartDate: startDate,
      teleWorkEndDate: endDate,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    borrowedDevice = await BorrowedDevices.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(data);

    await logAction({
      action: "telework",
      type: "itam",
      referenceId: borrowedDevice._id,
      serial: borrowedDevice.monitorSerial,
      receiver: borrowedDevice.userName,
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
// @route   PUT borrowed/tag/add/:id
// @access  Public
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for computer
    let borrowed = await BorrowedDevices.find({ _id: id });

    // check for computer
    if (!borrowed) {
      return next(
        new ErrorResponse(`The device with id ${id} cannot be found.`, 400)
      );
    }

    // Check that new tag does not already exist
    if (borrowed[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    borrowed = await BorrowedDevices.findByIdAndUpdate(
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
      type: "itam",
      referenceId: borrowedDevice._id,
      serial: borrowedDevice.monitorSerial,
      receiver: borrowedDevice.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: borrowed,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Delete Tag from item
// @route   PUT borrowed/tag/delete/:id
// @access  Public
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let borrowed = await BorrowedDevices.findOne({ _id: id });

    if (!borrowed) {
      return next(
        new ErrorResponse(`The device with id ${id} cannot be found.`, 400)
      );
    }

    borrowed = await BorrowedDevices.findByIdAndUpdate(
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
      type: "itam",
      referenceId: borrowedDevice._id,
      serial: borrowedDevice.monitorSerial,
      receiver: borrowedDevice.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: borrowed,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a ITAM Device
// @route   PUT itam/archive/:id
// @access  Public
exports.archiveItam = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving ITAM");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let itam = await BorrowedDevices.findOne({ _id: id });

    if (!itam) {
      return next(
        new ErrorResponse(`The ITAM device with id ${id} cannot be found.`, 400)
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

    itam = await BorrowedDevices.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log("UPDATED ITAM", itam);

    await updateDirectoryUsername(req.params.id, val);

    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "itam",
      referenceId: req.params.id,
      serial: itam.serial,
      receiver: archive ? "Inventory" : "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: itam,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});
