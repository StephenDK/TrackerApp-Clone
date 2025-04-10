const express = require("express");

const {
  getInventoryMonitors,
  getMonitors,
  inventoryMonitor,
  getMonitor,
  deleteMonitor,
  checkOutUpdateMonitor,
  checkInMonitor,
  inventoryMonitorAndCheckout,
  updateInventoryItem,
  updateTeleWork,
  archiveMonitor,
  addTag,
  deleteTag,
  getMonitorQRCode,
} = require("../controllers/monitors");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getMonitors).post(protect, inventoryMonitor);

router.route("/inventory").get(getInventoryMonitors);

router
  .route("/:id")
  .get(getMonitor)
  .put(protect, checkOutUpdateMonitor)
  .delete(deleteMonitor);

router.route("/checkin/:id").put(protect, checkInMonitor);

router.route("/inventory/checkout").post(protect, inventoryMonitorAndCheckout);

router.route("/update/:id").put(protect, updateInventoryItem);

router.route("/update/telework/:id").put(protect, updateTeleWork);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);
router.route("/tag/delete/:id").put(protect, deleteTag);

// Archive Route
router.route("/archive/:id").put(protect, archiveMonitor);

// QR Route
router.route("/qrcode/:id").get(getMonitorQRCode);

module.exports = router;
