const express = require("express");

const {
  getInventoryDeskPhones,
  getDeskPhones,
  getDeskPhone,
  inventoryDeskPhone,
  checkOutDeskPhone,
  checkInDeskPhone,
  deleteDeskPhone,
  updateInventoryItem,
  addNewDeskPhoneLine,
  deleteDeskPhoneLine,
  inventoryDeskPhoneCheckout,
  addTag,
  deleteTag,
  archiveDeskPhone,
} = require("../controllers/deskPhones");
const DeskPhones = require("../model/deskPhone");
// middleware
const { protect } = require("../middleware/auth");
const AdvancedResults = require("../middleware/advancedResults");

const router = express.Router();
router.route("/inventory").get(getInventoryDeskPhones);

router
  .route("/")
  .get(AdvancedResults(DeskPhones, null), getDeskPhones)
  .post(protect, inventoryDeskPhone);

router.route("/addphone/checkout").post(protect, inventoryDeskPhoneCheckout);

router
  .route("/:id")
  .get(getDeskPhone)
  .delete(deleteDeskPhone)
  .put(protect, checkOutDeskPhone);

router.route("/update/:id").put(protect, updateInventoryItem);
router.route("/checkin/:id").put(protect, checkInDeskPhone);

router
  .route("/line/:id")
  .post(protect, addNewDeskPhoneLine)
  .put(protect, deleteDeskPhoneLine);
// router.route("/line/:id/delete").put(deleteDeskPhoneLine);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);

// Archive Route
router.route("/archive/:id").put(protect, archiveDeskPhone);

// Delete Route
router.route("/tag/delete/:id").put(protect, deleteTag);

// Archive Route
router.route("/archive/:id").put(protect, archiveDeskPhone);

module.exports = router;
