const express = require("express");

const {
  returnAllDevices,
} = require("../controllers/search");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(returnAllDevices);


module.exports = router;