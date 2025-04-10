const Phones = require("../model/phone");
const Borrowed = require("../model/borrowedDevices");
const asyncHandler = require("../middleware/async");
const logAction = require("../utils/userAction");
const generateQRCode = require("../utils/generateQRCode");

// Lookup Utilities
const {
  createDirectoryEntry,
  deleteDirectoryEntry,
  updateDirectoryUsername,
} = require("../utils/createDirectoryEnrty");

const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all phones
// @route   GET /api/v1/phones
// @access  Public
exports.getPhones = asyncHandler(async (req, res, next) => {
  try {
    const phones = await Phones.find({});

    res.status(200).json({
      success: true,
      phones,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Get all checked out phones for inventory screen
// @route   GET /api/v1/phones/inventory
// @access  Public
exports.getInventoryPhones = asyncHandler(async (req, res, next) => {
  try {
    const phones = await Phones.find({ checkedOut: true });

    const checkedOutPhones = phones.map((item) => {
      const {
        _id,
        phoneIMEI,
        phoneMake,
        phoneModel,
        userName,
        division,
        lastUpdated,
      } = item;
      return {
        id: _id,
        type: "phones",
        serial: phoneIMEI,
        make: phoneMake,
        model: phoneModel,
        user: userName,
        division,
        lastUpdated,
      };
    });

    res.status(200).json({
      success: true,
      data: checkedOutPhones,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Get single phone from inventory
// @route   Get /api/v1/phones/:id
// @access  Public
exports.getPhone = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params);
    const phone = await Phones.findOne({ _id: req.params.id });
    // console.log(computer);
    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Add phone to Inventory
// @route   PUT /api/v1/phones
// @access  Public
exports.addPhone = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const { phoneIMEI, phoneNumber, phoneMake, phoneModel } = req.body;

    if (!phoneIMEI || !phoneMake || !phoneMake || !phoneModel) {
      return next(
        new ErrorResponse(
          `Phone IMEI, Make, and Model are all required fields`,
          400
        )
      );
    }

    let data = {
      phoneIMEI,
      phoneNumber,
      phoneMake,
      phoneModel,
      editedBy: req.user.email,
    };
    // Check if serial already exists in borrowed devices
    let checkBorrowed = await Borrowed.find({ serial: phoneIMEI });

    if (checkBorrowed.length > 0) {
      return next(
        new ErrorResponse(`Serial: ${phoneIMEI} already in ITAM loaners.`, 400)
      );
    }

    // console.log("Data", data);
    const phone = await Phones.create(data);

    await createDirectoryEntry(
      phone.phoneIMEI,
      "Inventory",
      "phones",
      phone._id
    );

    await logAction({
      action: "inventory",
      type: "phones",
      referenceId: phone._id,
      serial: phone.phoneIMEI,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (error) {
    console.log(Object.keys(error));
    console.log(error.name);
    next(error);
  }
});

// @desc    Checkin Phone
// @route   PUT /api/v1/phones/:id
// @access  Public
exports.checkInPhone = asyncHandler(async (req, res, next) => {
  try {
    console.log("Checking In Phone");
    console.log(req.body);

    let phone = await Phones.findById(req.params.id);

    // console.log(computer);
    if (!phone) {
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
      prevUser: phone.userName,
      checkedOutDate: null,
      checkedInDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    phone = await Phones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkin",
      type: "phones",
      referenceId: phone._id,
      serial: phone.phoneIMEI,
      receiver: data.location,
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

// @desc    Checkout phone from Inventory
// @route   PUT /api/v1/phones/:id
// @access  Public
exports.checkOutUpdatePhone = async (req, res, next) => {
  try {
    const { name, manager, division, comment, location, election } = req.body;
    console.log("Updating Phone");

    if (!name || !manager || !division) {
      return next(
        new ErrorResponse(
          `Username, election, division, and manager are all required fields`,
          400
        )
      );
    }

    let phone = await Phones.findById(req.params.id);
    console.log(req.body);
    // console.log(computer);
    if (!phone) {
      return next(
        new ErrorResponse(`Phone with id:${req.params.id} not found.`, 404)
      );
    }

    let data = {
      checkedOut: true,
      userName: name.toLowerCase(),
      division,
      manager,
      election,
      location,
      description: comment,
      checkedInDate: null,
      checkedOutDate: new Date(),
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    console.log("Phone Data", data);

    phone = await Phones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update Lookup Username
    await updateDirectoryUsername(req.params.id, data.userName);

    // Log Action
    await logAction({
      action: "checkout",
      type: "phones",
      referenceId: phone._id,
      serial: phone.phoneIMEI,
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
};

// @desc    Add phone to inventory and checkout
// @route   PUT /api/v1/phones/inventory/checkout
// @access  Public
// @lookup  Finished
// @action  Incomplete
exports.inventoryAndCheckoutPhone = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      imei,
      make,
      model,
      division,
      manager,
      userName,
      location,
      description,
    } = req.body;

    if (!imei || !make || !model || !division || !manager || !userName) {
      return next(new ErrorResponse(`Please enter all required fields.`, 400));
    }

    // Check borrowed devices before adding
    let checkITAM = await Borrowed.find({ serial: imei });

    if (checkITAM.length > 0) {
      return next(
        new ErrorResponse(`IMEI: ${imei} already in ITAM loaners.`, 400)
      );
    }

    let data = {
      phoneIMEI: imei,
      phoneMake: make,
      phoneModel: model,
      division,
      manager,
      userName: userName.toLowerCase(),
      location,
      description,
      checkedOut: true,
      checkedOutDate: new Date(),
      editedBy: req.user.email,
    };

    let phone = await Phones.create(data);

    // Add Device to Lookup
    await createDirectoryEntry(
      phone.phoneIMEI,
      phone.userName,
      "phones",
      phone._id
    );

    // Log Inventory Action
    await logAction({
      action: "inventory",
      type: "phones",
      referenceId: phone._id,
      serial: data.phoneIMEI,
      receiver: "Inventory",
      author: req.user.email,
    });

    // Log Checkout Action
    await logAction({
      action: "checkout",
      type: "phones",
      referenceId: phone._id,
      serial: data.phoneIMEI,
      receiver: data.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      phone,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @Desc Delete Phone From Inventory
// @route   DELETE /api/v1/phones/:id
// @access  Public
exports.deletePhone = async (req, res, next) => {
  try {
    console.log("Deleting Phone");
    // const phone = await Phones.findById(req.params.id);

    const phone = await Phones.findByIdAndDelete(req.params.id);

    if (!phone) {
      return next(
        new ErrorResponse(`Phone with id:${req.params.id} not found.`, 401)
      );
    }

    // Remove Device from Lookup
    await deleteDirectoryEntry(req.params.id);

    // Log Action
    await logAction({
      action: "delete",
      type: "phones",
      referenceId: req.params.id,
      serial: phone.phoneIMEI,
      receiver: "Inventory",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    consolele.log(err);
    next(err);
  }
};

// @desc    Update Phone in Inventory
// @route   POST /api/v1/phones/update/:id
// @access  Private
// @lookup  Finished
// @action  Incomplete
exports.updateInventoryItem = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      phoneNumber,
      make,
      model,
      userName,
      division,
      location,
      election,
      comment,
      manager,
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
      return next(new ErrorResponse(`Cannot Update Phone.`, 404));
    }

    let data = {
      phoneNumber,
      phoneModel: model,
      phoneMake: make,
      userName: userName.toLowerCase(),
      division,
      location,
      manager,
      election,
      description: comment,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };
    console.log("UPDATED DATA", data);

    // // delete empty object keys
    for (let propName in data) {
      console.log(propName);
      if (data[propName] === "" || data[propName] === null) {
        delete data[propName];
      }
    }

    // check for phone in database
    let phone = await Phones.findById(req.params.id);

    if (!phone) {
      return next(
        new ErrorResponse(`Phone with id:${req.params.id} not found.`, 404)
      );
    }

    phone = await Phones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Update
    if ("userName" in data) {
      // Update Lookup Username
      await updateDirectoryUsername(req.params.id, data.userName);
    }

    // Log Action
    await logAction({
      action: "edit",
      type: "phones",
      referenceId: phone._id,
      serial: phone.phoneIMEI,
      receiver: phone.userName,
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

// @desc    Update Teleworking
// @route   POST phones/update/telework/:id
// @access  Public
exports.updateTeleWork = asyncHandler(async (req, res, next) => {
  try {
    // console.log("Updating phones");
    // console.log(req.body);
    let phone = await Phones.findById(req.params.id);

    if (!phone) {
      return next(
        new ErrorResponse(`Computer with id:${req.params.id} not found.`, 401)
      );
    }

    let data = {
      teleWork: req.body.teleWork,
      teleWorkStartDate: req.body.startDate,
      teleWorkEndDate: req.body.endDate,
      lastUpdated: new Date(),
      editedBy: req.user.email,
    };

    phone = await Phones.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    // Log Action
    await logAction({
      action: "telework",
      type: "phones",
      referenceId: req.params.id,
      serial: phone.phoneIMEI,
      receiver: phone.userName,
      author: req.user.email,
    });

    // console.log(data);
    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @desc    Add Tag to item
// @route   PUT phones/tag/add/:id
// @access  Public
exports.addTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    // search for computer
    let phone = await Phones.find({ _id: id });

    // check for computer
    if (!phone) {
      return next(
        new ErrorResponse(`The phone with id ${id} cannot be found.`, 400)
      );
    }

    // Check that new tag does not already exist
    if (phone[0].tags.includes(tag)) {
      return next(new ErrorResponse(`Cannot add duplicate tags.`, 400));
    }

    // add new tag to tag field
    phone = await Phones.findByIdAndUpdate(
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

    // Log Action
    await logAction({
      action: "tag",
      type: "phones",
      referenceId: req.params.id,
      serial: phone.phoneIMEI,
      receiver: phone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Delete Tag from item
// @route   PUT phones/tag/delete/:id
// @access  Public
exports.deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;

    if (!tag) {
      return next(new ErrorResponse(`The tag field cannot be empty.`, 400));
    }

    let phones = await Phones.findOne({ _id: id });

    if (!phones) {
      return next(
        new ErrorResponse(`The phones with id ${id} cannot be found.`, 400)
      );
    }

    phones = await Phones.findByIdAndUpdate(
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

    // Log Action
    await logAction({
      action: "tag",
      type: "phones",
      referenceId: req.params.id,
      serial: phone.phoneIMEI,
      receiver: phone.userName,
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: phones,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Archive and Un-Archive a Phone
// @route   PUT phones/archive/:id
// @access  Public
exports.archivePhone = asyncHandler(async (req, res, next) => {
  try {
    let val = "Archived";
    console.log("Archiving Phone");
    console.log("ID", req.params.id);
    console.log("BODY", req.body);
    const { id } = req.params;
    const { archive } = req.body;

    let phone = await Phones.findOne({ _id: id });

    if (!phone) {
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

    phone = await Phones.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    await updateDirectoryUsername(req.params.id, val);

    console.log("UPDATED PHONE", phone);
    // Log Action
    await logAction({
      action: archive ? "unarchive" : "archive",
      type: "phones",
      referenceId: req.params.id,
      serial: phone.phoneIMEI,
      receiver: archive ? "Inventory" : "Archive",
      author: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: phone,
    });
  } catch (err) {
    console.log("ERROR", err);
    next(err);
  }
});

// @desc    Generate and Return Phone IMEI QR Code
// @route   PUT phones/qr/:id
// @access  Public
exports.getPhoneQRCode = asyncHandler(async (req, res, next) => {
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
