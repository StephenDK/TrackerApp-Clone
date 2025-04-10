// @Last Editor: SDK
// @Date: 1/15/2025
// @Status: Unfinished
// @Unfinished: DeleteAccessory,
// @Comment:

const Accessories = require("../model/accessories");
const DeviceLookup = require("../model/deviceLookup");
const Actions = require("../model/actions");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const generateQRCode = require("../utils/generateQRCode");

const logAction = require("../utils/userAction");

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");

// @desc    Get all accessories
// @route   GET /api/v1/accessories
// @access  Public
exports.getAccessories = asyncHandler(async (req, res, next) => {
  const accessories = await Accessories.find({});

  res.status(200).json({
    success: true,
    amount: accessories.length,
    accessories,
  });
});

// @desc    Get checked out accessories
// @route   GET /api/v1/accessories/inventory
// @access  Public
exports.getInventoryAccessories = asyncHandler(async (req, res, next) => {
  const accessories = await Accessories.find({ checkedOut: true });

  const newAccessories = accessories.map((item) => {
    const {
      _id,
      barcode,
      serial,
      make,
      model,
      category,
      userName,
      division,
      lastUpdated,
    } = item;
    return {
      id: _id,
      type: "accessory",
      serial,
      barcode,
      make: make,
      model: model,
      category,
      user: userName,
      division,
      lastUpdated,
    };
  });

  res.status(200).json({
    success: true,
    data: newAccessories,
  });
});

// @desc    Get single accessory
// @route   GET /api/v1/accessories/:id
// @access  Public
exports.getAccessory = asyncHandler(async (req, res, next) => {
  try {
    console.log("Getting Accessory");
    const accessory = await Accessories.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Add single or multiple accessories
// @route   Post /api/v1/accessories
// @access  Public
// @lookup  unfinished
// @action  unfinished
// @Notes   This route needs to be tested before push to production
exports.addAccessory = asyncHandler(async (req, res, next) => {
  try {
    console.log("Add Accessory:", req.body);
    let { serial, make, model, category, description, quantity } = req.body;

    if (isNaN(quantity) || quantity < 1) {
      return next(
        new ErrorResponse(
          "Quantity must be a number and greater than zero",
          400
        )
      );
    }

    quantity = Number(quantity);

    // check for empty input request
    if (make === "" && model === "" && category === "") {
      return next(
        new ErrorResponse("Make, Model, and Category are required fields", 400)
      );
    }

    if (quantity > 1) {
      let dbData = [];
      let lookupData = [];
      let actionsData = [];

      for (let i = 0; i < quantity; i++) {
        // console.log(i);
        // let barcode = new Date() + i.getTime().toString(36).toUpperCase();
        let code = new Date().getTime() + i;
        // console.log("CODE:", code.toString(36).toUpperCase());
        let data = {
          barcode: "ROV" + code.toString(36).toUpperCase(),
          make,
          model,
          category,
          description,
        };

        dbData.push(data);
      }

      // console.log(dbData);
      const insertedAccessories = await Accessories.insertMany(dbData, {
        ordered: true,
      });

      insertedAccessories.forEach((element) => {
        // Prepare data for devicelookup collection
        lookupData.push({
          serial: element.barcode,
          type: "accessory",
          userName: "Inventory",
          referenceId: element._id,
        });
        actionsData.push({
          action: "inventory",
          type: "accessory",
          referenceId: element._id,
          serial: element.barcode,
          receiver: "Inventory",
          author: req.user.email,
        });
      });

      // console.log("[ACCESSORIES]", insertedAccessories);

      console.log("[LOOKUP DATA]: ", lookupData);

      console.log("[ACTIONS DATA]: ", actionsData);

      // Add Accessories to Lookup
      await DeviceLookup.insertMany(lookupData, {
        ordered: true,
      });

      // console.log("[ACTIONS]", actionsData);
      // Save Actions
      await Actions.insertMany(actionsData, {
        ordered: true,
      });

      res.status(200).json({
        success: true,
        dbData,
      });
    } else {
      // console.log("SERIAL", serial);
      if (serial.length > 0) {
        // console.log("Serial Exists");
        // Check serial
        let accessoryCheck = await Accessories.find({
          serial: req.body.serial,
        });
        // console.log("ACCESSORY CHECK: ", accessoryCheck);
        if (accessoryCheck.length > 0) {
          return next(
            new ErrorResponse(
              `Accessory with serial ${req.body.serial} is already in the tracker`,
              404
            )
          );
        }
      }

      let barcode = "ROV" + new Date().getTime().toString(36).toUpperCase();

      let data = {
        serial: serial.toUpperCase(),
        barcode: barcode,
        make,
        model,
        category,
        description,
      };
      // console.log("DATA:", data);
      let accessory = await Accessories.create(data);

      // Add Accessory to Lookup
      await createDirectoryEntry(
        accessory.barcode,
        "Inventory",
        "accessory",
        accessory._id
      );

      // Log Action
      await logAction({
        action: "inventory",
        type: "accessory",
        referenceId: accessory._id,
        serial: accessory.barcode,
        receiver: "Inventory",
        author: req.user.email,
      });

      res.status(200).json({
        success: true,
        accessory,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Inventory and Checkout Accessory Item
// @route   POST /api/v1/addaccessory/checkout/
// @access  Public
exports.addAccessoryAndCheckout = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      serial,
      make,
      model,
      division,
      manager,
      userName,
      location,
      description,
      category,
    } = req.body;

    if (!category || !make || !model || !division || !manager || !userName) {
      return next(new ErrorResponse(`Please enter all required fields`, 400));
    }

    let barcode = "ROV" + new Date().getTime().toString(36).toUpperCase();

    let data = {
      serial: serial === "" || serial === null ? "" : serial.toUpperCase(),
      category,
      barcode,
      make,
      model,
      division,
      manager,
      userName: userName.toLowerCase(),
      location,
      description,
      checkedOut: true,
      checkedOutDate: new Date(),
      editedBy: req.user.email,
    };

    // console.log("ACCESSORY DATA", data);
    let accessory = await Accessories.create(data);

    // Add Device to Lookup
    await createDirectoryEntry(
      accessory.barcode,
      accessory.userName,
      "accessory",
      accessory._id
    );

    // Log Inventory Action
    await logAction({
      action: "inventory",
      type: "accessory",
      referenceId: accessory._id,
      serial: accessory.barcode,
      receiver: "Inventory",
      author: req.user.email,
    });

    // Log Checkout Action
    await logAction({
      action: "checkout",
      type: "accessory",
      referenceId: accessory._id,
      serial: accessory.barcode,
      receiver: accessory.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// @desc    Checkout Accessory Item
// @route   Put /api/v1/accessories/checkout/:id
// @access  Public
// @lookup  Finished
// @action  Incomplete
exports.checkOutAccessoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checkout Accessory", req.body);
    const { name, manager, division, comment, location, election } = req.body;

    if (!name || !manager || !division || !election) {
      return next(
        new ErrorResponse(
          `Username, election, division, and manager are all required fields`,
          400
        )
      );
    }

    let accessory = await Accessories.findById(req.params.id);

    if (!accessory) {
      return next(
        new ErrorResponse(`Accessory with id:${req.params.id} not found.`, 404)
      );
    }

    // console.log("Checked Out Controller", accessory);

    // Creating data for db
    let data = {
      checkedOut: true,
      userName: name.toLowerCase(),
      election,
      division,
      manager,
      location,
      description: comment,
      checkedOutDate: new Date(),
      checkedInDate: null,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    accessory = await Accessories.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkout",
      type: "accessory",
      referenceId: req.params.id,
      serial: accessory.barcode,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Check in accessories
// @route   Post /api/v1/accessories/checkin/:id
// @access  Public
// @lookup  Finished
// @action  Incomplete
exports.checkInAccessoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checking In Accessory");
    console.log(req.body);

    let accessory = await Accessories.findById(req.params.id);

    if (!accessory) {
      return next(
        new ErrorResponse(`Accessory with id:${req.params.id} not found.`, 404)
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
      prevUser: accessory.userName,
      checkedOutDate: null,
      checkedInDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    //   console.log("CHECK IN DATA: ", data);
    accessory = await Accessories.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkin",
      type: "accessory",
      referenceId: req.params.id,
      serial: accessory.barcode,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Update Accessory Item
// @route   Put /api/v1/accessories/checkout/:id
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
      return next(new ErrorResponse(`Cannot Update Monitor.`, 404));
    }

    let data = {
      make,
      model,
      userName: userName.toLowerCase(),
      election,
      division,
      manager,
      location,
      description: comment,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    for (let propName in data) {
      if (data[propName] === "" || data[propName] === null) {
        delete data[propName];
      }
    }
    // console.log("DATA AFTER REMOVING PROPS", data);

    let accessory = await Accessories.findById(req.params.id);

    if (!accessory) {
      return next(
        new ErrorResponse(`Accessory with id:${req.params.id} not found.`, 404)
      );
    }

    accessory = await Accessories.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    await logAction({
      action: "edit",
      type: "accessory",
      referenceId: accessory._id,
      serial: accessory.barcode,
      receiver: accessory.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log(err);
  }
});

// @desc    Delete Accessory Item
// @route   Delete /api/v1/accessories/delete/:id
// @access  Public
exports.deleteAccessory = async (req, res, next) => {
  try {
    // const accessory = await Accessories.findById(req.params.id);

    const accessory = await Accessories.findByIdAndDelete(req.params.id);

    // console.log("DELETING ITEM:");
    if (!accessory) {
      return next(
        new ErrorResponse(`Accessory with id:${req.params.id} not found.`, 401)
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
};

// @desc    Add Tag to item
// @route   PUT accessory/tag/add/:id
// @access  Public
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for computer
    let accessory = await Accessories.find({ _id: id });

    // check for computer
    if (!accessory) {
      return next(
        new ErrorResponse(`The accessory with id ${id} cannot be found.`, 400)
      );
    }

    // Check that new tag does not already exist
    if (accessory[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    accessory = await Accessories.findByIdAndUpdate(
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
      type: "accessory",
      referenceId: accessory._id,
      serial: accessory.barcode,
      receiver: accessory.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Delete Tag from item
// @route   PUT accessory/tag/delete/:id
// @access  Public
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let accessory = await Accessories.findOne({ _id: id });

    if (!accessory) {
      return next(
        new ErrorResponse(`The accessory with id ${id} cannot be found.`, 400)
      );
    }

    accessory = await Accessories.findByIdAndUpdate(
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

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a Accessory
// @route   PUT accessories/archive/:id
// @access  Public
// @lookup  Finished
// @action  Finished
exports.archiveAccessory = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving Accessory");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let accessory = await Accessories.findOne({ _id: id });

    if (!accessory) {
      return next(
        new ErrorResponse(`The accessory with id ${id} cannot be found.`, 400)
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

    accessory = await Accessories.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log("UPDATED ACCESSORY", accessory);

    await updateDirectoryUsername(req.params.id, val);

    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "accessory",
      referenceId: req.params.id,
      serial: accessory.barcode,
      receiver: archive ? "Inventory" : "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: accessory,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Generate and Return Accessory QR Code
// @route   PUT accessories/qr/:id
// @access  Public
exports.accessoryQRCode = asyncHandler(async (req, res, next) => {
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
