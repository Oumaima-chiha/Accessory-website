const express = require("express");
const router = express.Router();

const{
    getMyPayments, createPayment,downloadReceipt,
} =require('../controller/payment')

//router.route("/").get(getCarts);
router.route("/history/:userId").get(getMyPayments);
router.route("/receipt/:paymentId").get(downloadReceipt);
router.route("/process").post(createPayment);


module.exports = router;
