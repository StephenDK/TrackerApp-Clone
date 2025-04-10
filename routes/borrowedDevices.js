const express = require("express");

const {
  getBorrowedDevices,
  addBorrowedDevice,
  getBorrowedDevice,
  checkOutBorrowedDevice,
  deleteBorrowedDevices,
  updateBorrowedInventoryItem,
  CheckInBorrowedItem,
  getFilteredDevices,
  updateTeleWork,
  addTag,
  deleteTag,
  archiveItam,
  getBorrowedInventory,
} = require("../controllers/borrowedDevices");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/inventory").get(getBorrowedInventory);

router.route("/").get(getBorrowedDevices).post(protect, addBorrowedDevice);

router
  .route("/:id")
  .get(getBorrowedDevice)
  .put(protect, checkOutBorrowedDevice);

router.route("/checkin/:id").put(protect, CheckInBorrowedItem);

router.route("/device/:id").delete(deleteBorrowedDevices);

router.route("/update/:id").put(protect, updateBorrowedInventoryItem);

// Delete?
// // Filtered Devices
// router.route("/filter/:id").get(getFilteredDevices);

// Telework Routes
router.route("/update/telework/:id").put(protect, updateTeleWork);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);
router.route("/tag/delete/:id").put(protect, deleteTag);

// Archive Route
router.route("/archive/:id").put(protect, archiveItam);

module.exports = router;
