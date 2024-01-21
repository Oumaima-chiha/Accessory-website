const express = require("express");
const router = express.Router();

const {
    getJeweleries, getTags, getJewelryByTagId, addTagOnJewelries
} =require('../controller/Jewelry')

router
  .route("/")
  .get(getJeweleries)
  router
  .route("/tags")
  .get(getTags)
  router
  .route("/tag/:tagId")
  .get(getJewelryByTagId)
  router
  .route("/addTag/:tagId/:jewelryId")
  .post(addTagOnJewelries)
  
  module.exports = router;