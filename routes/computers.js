// Done with protecting routes

const express = require("express");

const {
  getInventoryComputers,
  getComputers,
  addComputer,
  getComputer,
  deleteComputer,
  checkOutComputer,
  checkInComputer,
  inventoryComputerAndCheckout,
  updateInventoryItem,
  updateTeleWork,
  addTag,
  deleteTag,
  archiveComputer,
  computerQRCode,
  // downloadQRCode,
} = require("../controllers/computers");

// middleware
const { protect } = require("../middleware/auth");

const AdvancedResults = require("../middleware/advancedResults");

const Computers = require("../model/computer");

const router = express.Router();

router.route("/inventory").get(getInventoryComputers);

router
  .route("/")
  .get(AdvancedResults(Computers), getComputers)
  .post(protect, addComputer);

router
  .route("/:id")
  .get(getComputer)
  .delete(deleteComputer) // come back later to check role
  .put(protect, checkOutComputer);

router.route("/checkin/:id").put(protect, checkInComputer);

router
  .route("/addcomputer/checkout")
  .post(protect, inventoryComputerAndCheckout);

router.route("/update/:id").put(protect, updateInventoryItem);

router.route("/update/telework/:id").put(protect, updateTeleWork);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);
router.route("/tag/delete/:id").put(protect, deleteTag);

// Archive Route
router.route("/archive/:id").put(protect, archiveComputer);

// QR Route
router.route("/qrcode/:id").get(computerQRCode);

// QR Route
// router.route("/test/qrcode/:id").get(downloadQRCode);

module.exports = router;
