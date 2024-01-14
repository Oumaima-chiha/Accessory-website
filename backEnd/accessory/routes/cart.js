const express = require("express");
const router = express.Router();
const isAuthenticated=require('../middlwares/isAuthenticated');
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized');
const{
    getMyCart,
   addToCart ,
   getCarts,
   removeAllFromCart,
   removeFromCart,
   incrementItem,
   decrementItem
} =require('../controller/cart')

router.route("/").get(getCarts);
router.route("/my-cart").get(isAuthenticated,isCustomerAuthorized,getMyCart);
router.route("/product/:jewelryID").post(isAuthenticated,isCustomerAuthorized,addToCart);
router.route("/productInc/:id").patch(isAuthenticated,isCustomerAuthorized,incrementItem);
router.route("/productDec/:id").patch(isAuthenticated,isCustomerAuthorized,decrementItem);
router.route("/delete/:cartItemID").delete(isAuthenticated,isCustomerAuthorized,removeFromCart);
router.route("/deleteAll").delete(isAuthenticated,isCustomerAuthorized,removeAllFromCart);

module.exports = router;
