const express = require("express");
const router = express.Router();
const isAuthenticated=require('../middlwares/isAuthenticated');
const isCustomerAuthorized = require('../middlwares/isCustomerAuthorized');

const{
    getMyPayments, createPayment,downloadReceipt,
} =require('../controller/payment')

//router.route("/").get(getCarts);
router.route("/history/:userId").get(isAuthenticated,isCustomerAuthorized,getMyPayments);
router.route("/receipt/:paymentId").get(isAuthenticated,isCustomerAuthorized,downloadReceipt);
router.route("/process").post(isAuthenticated,isCustomerAuthorized,createPayment);


module.exports = router;
