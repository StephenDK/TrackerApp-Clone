const express = require("express");

const {
  getComputerFile,
  getComputerTypes,
} = require("../controllers/data/computers");

const { getMonitorFile } = require("../controllers/data/monitors");

const { getDockingstations } = require("../controllers/data/dockingstations");

const { getPhoneFile } = require("../controllers/data/phones");

const { getDivisionsAndManagers } = require("../controllers/data/divisions");

const { getDeskPhonesFile } = require("../controllers/data/deskphones");

const { getAccessoriesFile } = require("../controllers/data/accessories");

const { getItamCategoryFile } = require("../controllers/data/itam");

const { getElectionsFile } = require("../controllers/data/elections");

const router = express.Router();

// Routes for computer make, model, and type files
router.route("/computers").get(getComputerFile);
router.route("/computers/types").get(getComputerTypes);

// Routes for division documents files
router.route("/divisions").get(getDivisionsAndManagers);

// Routes for monitor makes and models
router.route("/monitors").get(getMonitorFile);

// Routes for Dockingstation document files
router.route("/dockingstations").get(getDockingstations);

// Routes for cell phone document files
router.route("/phones").get(getPhoneFile);

// Routes for desk phone document files
router.route("/desk/phones").get(getDeskPhonesFile);

// Routes for accessories document files
router.route("/accessory/categories").get(getAccessoriesFile);

// Routes for ITAM loaner equipment files
router.route("/itam/categories").get(getItamCategoryFile);

// Routes for ITAM elections files
router.route("/elections").get(getElectionsFile);

module.exports = router;
