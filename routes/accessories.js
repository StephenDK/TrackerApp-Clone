const express = require("express");

const {
  getInventoryAccessories,
  getAccessories,
  getAccessory,
  addAccessory,
  addAccessoryAndCheckout,
  checkOutAccessoryItem,
  checkInAccessoryItem,
  updateInventoryItem,
  deleteAccessory,
  addTag,
  archiveAccessory,
  deleteTag,
  accessoryQRCode,
} = require("../controllers/accessories");

// middleware
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getAccessories).post(protect, addAccessory);

router.route("/addaccessory/checkout").post(protect, addAccessoryAndCheckout);

router.route("/inventory").get(getInventoryAccessories);

router.route("/:id").get(getAccessory);

router.route("/:id").put(protect, checkOutAccessoryItem);

router.route("/update/:id").put(protect, updateInventoryItem);

router.route("/checkin/:id").put(protect, checkInAccessoryItem);

router.route("/delete/:id").delete(deleteAccessory);

// Archive Route
router.route("/archive/:id").put(protect, archiveAccessory);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);
router.route("/tag/delete/:id").put(protect, deleteTag);

// QR Route
router.route("/qrcode/:id").get(accessoryQRCode);

module.exports = router;
