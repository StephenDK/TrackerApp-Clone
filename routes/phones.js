const express = require("express");

// Controllers
const {
  getInventoryPhones,
  getPhones,
  addPhone,
  getPhone,
  deletePhone,
  inventoryAndCheckoutPhone,
  checkOutUpdatePhone,
  checkInPhone,
  updateInventoryItem,
  updateTeleWork,
  addTag,
  deleteTag,
  archivePhone,
  getPhoneQRCode,
} = require("../controllers/phones");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getPhones).post(protect, addPhone);

router.route("/inventory").get(getInventoryPhones);

router
  .route("/:id")
  .get(getPhone)
  .put(protect, checkOutUpdatePhone)
  .delete(deletePhone);

router.route("/inventory/checkout").post(protect, inventoryAndCheckoutPhone);

router.route("/checkin/:id").put(protect, checkInPhone);

router.route("/update/:id").put(protect, updateInventoryItem);

router.route("/update/telework/:id").put(protect, updateTeleWork);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);
router.route("/tag/delete/:id").put(protect, deleteTag);

// Archive Route
router.route("/archive/:id").put(protect, archivePhone);

// QR Route
router.route("/qrcode/:id").get(getPhoneQRCode);

module.exports = router;
