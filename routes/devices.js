const express = require("express");

const {
  getInventoryDevices,
  getArchivedDevices,
  getRecentInventoried,
} = require("../controllers/devices");
const router = express.Router();

router.route("/").get(getInventoryDevices);

router.route("/archive").get(getArchivedDevices);

router.route("/recent").get(getRecentInventoried);

module.exports = router;
