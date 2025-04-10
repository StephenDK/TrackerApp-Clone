const express = require("express");

const {
  getDockingstationInventory,
  getAllDockingStations,
  addDockingStation,
  addDockAndCheckout,
  getDockingStation,
  checkOutDockingStation,
  updateInventoryItem,
  deleteDockingStation,
  checkInDockingStation,
  updateTeleWork,
  archiveDockingstation,
  addTag,
  deleteTag,
  dockQRCode,
} = require("../controllers/dockingStations");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/inventory").get(getDockingstationInventory);

router.route("/").get(getAllDockingStations);

router
  .route("/:id")
  .get(getDockingStation)
  .put(protect, checkOutDockingStation)
  .delete(deleteDockingStation);

router.route("/adddock/checkout").post(protect, addDockAndCheckout);

router.route("/checkin/:id").put(protect, checkInDockingStation);

router.route("/adddockinstation").post(protect, addDockingStation);

router.route("/update/:id").put(protect, updateInventoryItem);

router.route("/update/telework/:id").put(protect, updateTeleWork);

// Tag Routes
router.route("/tag/add/:id").put(protect, addTag);
router.route("/tag/delete/:id").put(protect, deleteTag);

// Archive Route
router.route("/archive/:id").put(protect, archiveDockingstation);

// QR Route
router.route("/qrcode/:id").get(dockQRCode);

module.exports = router;
