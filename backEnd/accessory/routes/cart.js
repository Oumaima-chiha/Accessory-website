const express = require("express");
const router = express.Router();

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
router.route("/:id").get(getMyCart);
router.route("/product/:userID/:jewelryID").post(addToCart);
router.route("/productInc/:id").patch(incrementItem);
router.route("/productDec/:id").patch(decrementItem);
router.route("/delete/:userID/:cartItemID").delete(removeFromCart);
router.route("/deleteAll/:userID").delete(removeAllFromCart);

module.exports = router;
