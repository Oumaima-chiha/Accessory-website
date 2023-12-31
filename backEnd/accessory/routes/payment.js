const express = require("express");
const router = express.Router();

const{
    getMyPayments, createPayment
} =require('../controller/payment')

//router.route("/").get(getCarts);
router.route("/:userId").get(getMyPayments);
router.route("/process").post(createPayment);


module.exports = router;
