const express = require("express");

const {
  archiveField,
  transferUserDocumentField,
  addDPField,
} = require("../controllers/scripts");

// middleware

const router = express.Router();

// router.route("/add/archive/field").get(archiveField);

// router.route("/add/document/field").get(archiveField);
// router.route("/remove/document/field").get(archiveField);

router.route("/transfer/user/field").get(transferUserDocumentField);

// router.route("/add/deskphone/field").get(addDPField);

module.exports = router;
