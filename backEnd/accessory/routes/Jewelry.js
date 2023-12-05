const express = require("express");
const router = express.Router();

const {
    getJeweleries
} =require('../controller/Jewelry')

router
  .route("/")
  .get(getJeweleries)
  module.exports = router;