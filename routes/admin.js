const { generateReport, barcodeDelete, updateLocation } = require("../controllers/admin");
const { batchTag } = require("../controllers/batchTag");
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route('/')
  .get(generateReport)

router
  .route('/:id')
  .delete(barcodeDelete)

router
  .route('/update/location')
  .put(updateLocation)

router
  .route('/batchTag')
  .put(upload.single('file'), batchTag)

module.exports = router;