const express = require("express");
const router = express.Router();
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized');
const isAuthenticated=require('../middlwares/isAuthenticated');

const {
    getJeweleries, getTags, getJewelryByTagId, addTagOnJewelries, getFavorites, addToFavorites, removeFromFavorites,
  removeAllFavorites,
  createJewelry,updateJewelry,deleteJewelry,getAllJeweleries
} =require('../controller/Jewelry')
const { authenticateBackoffice } = require('../middlwares/authenticateBackoffice');

router
  .route("/")
  .get(getJeweleries)
  .post(authenticateBackoffice,createJewelry)
router
  .route("/all")
  .get(authenticateBackoffice,getAllJeweleries,)
  router
  .route("/:id")
  .put(updateJewelry)
  .delete(deleteJewelry)
  router
  .route("/tags")
  .get(getTags)
  router
  .route("/tag/:tagId")
  .get(getJewelryByTagId)
  router
  .route("/addTag/:tagId/:jewelryId")
  .post(addTagOnJewelries)
    router
    .route("/favorites")
    .get(isAuthenticated,isCustomerAuthorized,getFavorites)
        .delete(isAuthenticated,isCustomerAuthorized,removeAllFavorites)
    router
    .route("/favorite/:jewelryId")
    .post(isAuthenticated,isCustomerAuthorized,addToFavorites)
    .delete(isAuthenticated,isCustomerAuthorized,removeFromFavorites)
  module.exports = router;
