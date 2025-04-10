// Done with protecting routes

const express = require("express");

const { getActions } = require("../controllers/actions");

const router = express.Router();

router.route("/").get(getActions);

module.exports = router;
