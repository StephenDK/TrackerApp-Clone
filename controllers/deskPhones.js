// @Last Editor: SDK
// @Date: 1/15/2025
// @Status: Unfinished
// @Unfinished: DeleteDeskphone,
// @Comment:

const DeskPhones = require("../model/deskPhone");
const asyncHandler = require("../middleware/async");
// const { nextLine } = require('pdf-lib');

const ErrorResponse = require("../utils/errorResponse");

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");
const deskPhone = require("../model/deskPhone");

// Log Action Function
const logAction = require("../utils/userAction");

// @desc    Get all desk phones
// @route   GET /api/v1/desk/phones
// @access  Public
// @status  Done
// @error
exports.getDeskPhones = asyncHandler(async (req, res, next) => {
  try {
    const phones = await DeskPhones.find({});

    res.status(200).json({
      success: true,
      phones,
    });
  } catch (err) {
    console.log(err);
  }
});

// @desc    Get all checked out desk phones
// @route   GET /api/v1/desk/phones/inventory
// @access  Public
// @status  Done
// @error
exports.getInventoryDeskPhones = asyncHandler(async (req, res, next) => {
  try {
    const phones = await DeskPhones.find({ checkedOut: true }).sort({
      phoneName: 1,
    });

    const deskphones = phones.map((item) => {
      const {
        _id,
        phoneName,
        phoneMAC,
        phoneNumber,
        phoneMake,
        phoneModel,
        userName,
        division,
        lastUpdated,
      } = item;
      return {
        id: _id,
        type: "deskphones",
        serial: phoneMAC,
        number: phoneNumber,
        name: phoneName,
        make: phoneMake,
        model: phoneModel,
        user: userName,
        division,
        lastUpdated,
      };
    });

    res.status(200).json({
      success: true,
      data: deskphones,
    });
  } catch (err) {
    console.log(err);
  }
});

// @desc    Get single desk phone
// @route   GET /api/v1/desk/phones
// @access  Public
//@status   Done
//@error
exports.getDeskPhone = asyncHandler(async (req, res, next) => {
  try {
    let phone = await DeskPhones.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Inventory Desk Phone
// @route   POST /api/v1/desk/phones/
// @access  Public
// @status  Done
// @lookup  Finished
// @comment
exports.inventoryDeskPhone = asyncHandler(async (req, res, next) => {
  try {
    let { mac, number, name, make, model } = req.body;

    if (!name) {
      return next(new ErrorResponse(`ROVDP is required for every phone.`, 400));
    }

    if (Number(name) < 1) {
      return next(new ErrorResponse(`ROVDP must be greater than 0.`, 400));
    }

    if (!mac) {
      return next(
        new ErrorResponse(
          `MAC Address is required to inventory a deskphone.`,
          400
        )
      );
    }
    let phoneCheck = await DeskPhones.findOne({ phoneMAC: mac });

    if (phoneCheck) {
      return next(
        new ErrorResponse(
          `Desk phone with MAC:${mac} is already inventoried.`,
          400
        )
      );
    }
    let ROVDPCheck = await DeskPhones.findOne({ phoneName: name });

    if (ROVDPCheck) {
      return next(
        new ErrorResponse(
          `Desk phone with ROVDP #:${name} is already inventoried.`,
          400
        )
      );
    }

    // Get extension
    let ext = number
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace("-", "");

    let newExt = `2${ext.slice(-4)}`;

    let data = {
      phoneMAC: mac.toUpperCase(),
      phoneNumber: number,
      phoneName: Number(name),
      phoneMake: make,
      phoneModel: model,
      extension: newExt,
      checkedOut: false,
      editedBy: req.user.email,
      createdAt: new Date(),
    };

    console.log(data);

    phone = await DeskPhones.create(data);

    await createDirectoryEntry(
      data.phoneMAC,
      "Inventory",
      "deskphones",
      phone._id
    );

    await logAction({
      action: "inventory",
      type: "deskphones",
      referenceId: phone._id,
      serial: data.phoneMAC,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Inventory Desk Phone and Checkout
// @route   POST /api/v1/desk/phone/addphone/checkout
// @access  Public
// @status  Done
// @lookup  Finished
// @action  Finished
exports.inventoryDeskPhoneCheckout = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);

    let {
      mac,
      number,
      name,
      make,
      model,
      division,
      manager,
      user,
      location,
      description,
    } = req.body;
    let lines = req.body.lines;

    console.log(lines);
    if (!name) {
      return next(new ErrorResponse(`ROVDP is required for every phone.`, 400));
    }

    if (Number(name) < 1) {
      return next(new ErrorResponse(`ROVDP must be greater than 0.`, 400));
    }

    if (!mac) {
      return next(
        new ErrorResponse(
          `MAC Address is required to inventory a deskphone.`,
          400
        )
      );
    }
    let phoneCheck = await DeskPhones.findOne({ phoneMAC: mac });

    if (phoneCheck) {
      return next(
        new ErrorResponse(
          `Desk phone with MAC:${mac} is already inventoried.`,
          400
        )
      );
    }
    let ROVDPCheck = await DeskPhones.findOne({ phoneName: name });

    if (ROVDPCheck) {
      return next(
        new ErrorResponse(
          `Desk phone with ROVDP #:${name} is already inventoried.`,
          400
        )
      );
    }

    let ext = number
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace("-", "");

    let newExt = `2${ext.slice(-4)}`;

    let data = {
      phoneMAC: mac.toUpperCase(),
      phoneNumber: number,
      phoneName: Number(name),
      phoneMake: make,
      phoneModel: model,
      extension: newExt,
      division,
      manager,
      userName: user.toLowerCase(),
      location,
      description,
      lines,
      checkedOut: true,
      checkedOutDate: new Date(),
      editedBy: req.user.email,
      createdAt: new Date(),
    };

    phone = await DeskPhones.create(data);

    // Add Device to Lookup
    await createDirectoryEntry(
      data.phoneMAC,
      data.userName,
      "deskphones",
      phone._id
    );

    // Log Inventory Action
    await logAction({
      action: "inventory",
      type: "deskphones",
      referenceId: phone._id,
      serial: data.phoneMAC,
      receiver: "Inventory",
      author: req.user.email,
    });

    // Log Checkout Action
    await logAction({
      action: "checkout",
      type: "deskphones",
      referenceId: phone._id,
      serial: data.phoneMAC,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Check Out Desk Phone
// @route   PUT /api/v1/deskphones/id
// @access  Public
// @status  Done
// @status  Done
// @lookup  Finished
// @comment
exports.checkOutDeskPhone = asyncHandler(async (req, res, next) => {
  try {
    const { name, manager, division, comment, location, election } = req.body;

    let phone = await DeskPhones.findById(req.params.id);

    if (!name || !manager || !division || !election) {
      return next(
        new ErrorResponse(
          `User, Division, and Manager, and Election are required fields`,
          401
        )
      );
    }

    if (!phone) {
      return next(
        new ErrorResponse(`Desk Phone with id:${req.params.id} not found.`, 401)
      );
    }

    // Creating data for db
    let data = {
      checkedOut: true,
      userName: name.toLowerCase(),
      election,
      division,
      manager,
      location,
      description: comment,
      checkedInDate: null,
      checkedOutDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };
    console.log("Check Out Data:", data);

    phone = await DeskPhones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkout",
      type: "deskphones",
      referenceId: req.params.id,
      serial: phone.phoneMAC,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Check In Desk Phone
// @route   PUT /api/v1/deskphones/checkin/id
// @access  Public
// @status  Done
// @lookup  Finished
// @comment
exports.checkInDeskPhone = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checking In Phone:");
    let phone = await DeskPhones.findById(req.params.id);

    if (!phone) {
      return next(
        new ErrorResponse(`Desk Phone with id:${req.params.id} not found.`, 401)
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
      prevUser: phone.userName,
      checkedInDate: new Date(),
      checkedOutDate: null,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };
    console.log("Check In Data:", data);

    phone = await DeskPhones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkin",
      type: "deskphones",
      referenceId: req.params.id,
      serial: phone.phoneMAC,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Delete Desk Phone
// @route   DELETE /api/v1/desk/phones
// @access  Public
// @status  Done
exports.deleteDeskPhone = asyncHandler(async (req, res, next) => {
  try {
    // const phone = await DeskPhones.findById(req.params.id);
    const phone = await DeskPhones.findByIdAndDelete(req.params.id);

    if (!phone) {
      return next(
        new ErrorResponse(`Desk Phone with id:${req.params.id} not found.`, 401)
      );
    }

    // Remove Device from Lookup
    await deleteDirectoryEntry(req.params.id);

    // Log Action
    // await logAction({
    //   action: "delete",
    //   type: "deskphones",
    //   referenceId: req.params.id,
    //   serial: phone.phoneMAC,
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

// @desc    Update Desk Phone
// @route   POST /api/v1/deskphones/update/:id
// @access  Public
// @status  Done
// @lookup  Finished
// @comment
exports.updateInventoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log("REQ BODY: ", req.body);
    const {
      phoneNumber,
      make,
      model,
      userName,
      division,
      location,
      election,
      manager,
      comment,
    } = req.body;
    if (
      !phoneNumber &&
      !make &&
      !model &&
      !userName &&
      !division &&
      !manager &&
      !location &&
      !election &&
      !comment
    ) {
      return next(new ErrorResponse(`Cannot update desk phone.Enter all fields or a single field to edit.`, 404));
    }

    let newExt = "";

    if (phoneNumber) {
      let ext = phoneNumber
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace("-", "");

      newExt = `2${ext.slice(-4)}`;
    }

    let data = {
      phoneNumber,
      phoneMake: make,
      phoneModel: model,
      extension: newExt,
      userName: userName.toLowerCase(),
      division,
      manager,
      location,
      election,
      description: comment,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    console.log("DATA BEFORE:", data);
    for (let propName in data) {
      console.log(propName);
      if (
        data[propName] === "" ||
        data[propName] === null ||
        data[propName] === 0
      ) {
        delete data[propName];
      }
    }

    console.log("DATA AFTER:", data);

    let deskPhone = await DeskPhones.findById(req.params.id);

    if (!deskPhone) {
      return next(
        new ErrorResponse(`Deskphone with id:${req.params.id} not found.`, 404)
      );
    }

    deskPhone = await DeskPhones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    await logAction({
      action: "edit",
      type: "deskphones",
      referenceId: deskPhone._id,
      serial: deskPhone.phoneMAC,
      receiver: deskPhone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: deskPhone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Line Controllers

// @desc    Add a New Line to Deskphone
// @route   POST /api/v1/desk/phones
// @access  Public
// @status
// @lookup  Finished
// @action  Finished
exports.addNewDeskPhoneLine = asyncHandler(async (req, res, next) => {
  try {
    console.log("Update Lines");
    console.log("REQ BODY: ", req.body);
    console.log("REQ USER: ", req.user);
    console.log(req.params.id);
    const { name, number } = req.body;

    if (name === "" || number === "") {
      return next(
        new ErrorResponse(
          `Line name and number are required to add a line.`,
          404
        )
      );
    }

    let user = {
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    let data = {
      lineName: name,
      lineNumber: number,
    };
    let deskPhone = await DeskPhones.find({ _id: req.params.id });

    if (!deskPhone) {
      return next(
        new ErrorResponse(`Deskphone with id:${req.params.id} not found.`, 404)
      );
    }

    deskPhone = await DeskPhones.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { lines: data }, // Pushes the `data` into the `lines` array
        $set: user, // Updates the fields in `user`
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(deskPhone);

    await logAction({
      action: "line",
      type: "deskphones",
      referenceId: deskPhone._id,
      serial: deskPhone.phoneMAC,
      receiver: deskPhone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: deskPhone,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// @desc    Delete deskphone line
// @route   POST /api/v1/desk/phones
// @access  Public
// @status
// @lookup  Finished
// @action  Finished
exports.deleteDeskPhoneLine = asyncHandler(async (req, res, next) => {
  try {
    console.log("Deleting Line");
    console.log(req.params);
    console.log("REQ BODY: ", req.body);

    const { lineNumber } = req.body;
    console.log("LINE NUMBER:", lineNumber);

    let deskPhone = await DeskPhones.findById({ _id: req.params.id });
    console.log("BEFORE DELETE: ", deskPhone);
    if (!deskPhone) {
      return next(
        new ErrorResponse(`Deskphone with id:${req.params.id} not found.`, 404)
      );
    }

    deskPhone = await DeskPhones.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { lines: { lineNumber: lineNumber } } },
      { new: true }
    );
    // deskPhone = await DeskPhones.updateOne(
    //   { _id: req.params.id },
    //   { $pull: { lines: { lineNumber: req.params.line } } }
    // );
    // // db.posts.updateOne(
    // //   { _id" : ObjectId("5ec55af811ac5e2e2aafb2b9") },
    // //   { $pull: { comments: { user: "Database Rebel" } } }
    // // )
    // console.log("AFTER DELETE", deskPhone);

    await logAction({
      action: "line",
      type: "deskphones",
      referenceId: deskPhone._id,
      serial: deskPhone.phoneMAC,
      receiver: deskPhone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: deskPhone,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// @desc    Add Tag to item
// @route   PUT desk/phone/tag/add/:id
// @access  Public
// @status
// @lookup  Finished
// @action  Finished
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for computer
    let deskphone = await DeskPhones.find({ _id: id });

    // check for computer
    if (!deskphone) {
      return next(
        new ErrorResponse(`The deskphone with id ${id} cannot be found.`, 400)
      );
    }

    // Check that new tag does not already exist
    if (deskphone[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    deskphone = await DeskPhones.findByIdAndUpdate(
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
      type: "deskphones",
      referenceId: deskphone._id,
      serial: deskphone.phoneMAC,
      receiver: deskphone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: deskphone,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Delete Tag from item
// @route   PUT desk/phone/tag/delete/:id
// @access  Public
// @action  Finished
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let deskphone = await DeskPhones.findOne({ _id: id });

    if (!deskphone) {
      return next(
        new ErrorResponse(`The deskphone with id ${id} cannot be found.`, 400)
      );
    }

    deskphone = await DeskPhones.findByIdAndUpdate(
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
      type: "deskphones",
      referenceId: deskphone._id,
      serial: deskphone.phoneMAC,
      receiver: deskphone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: deskphone,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a Desk Phone
// @route   PUT deskphones/archive/:id
// @access  Public
// @lookup  Finished
// @action  Finished
exports.archiveDeskPhone = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving Desk Phone");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let deskPhone = await DeskPhones.findOne({ _id: id });

    if (!deskPhone) {
      return next(
        new ErrorResponse(`The desk phone with id ${id} cannot be found.`, 400)
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

    deskPhone = await DeskPhones.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    console.log("UPDATED DESK PHONE", deskPhone);

    await updateDirectoryUsername(req.params.id, val);

    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "deskphones",
      referenceId: req.params.id,
      serial: deskPhone.phoneMAC,
      receiver: archive ? "Inventory" : "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: deskPhone,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});
