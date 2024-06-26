const express = require("express");
const router = express.Router();

const {
  createCustomers,
  getLoggedInUser,
  verifyEmail,
  customerSignin,
  forgotPassword,
  verifyResetCode,
  updatePassword,
  getExpoToken,
  checkNotification,
 getAllCustomers,
  getOneCustomers,
  banCustomerById,
  unbanCustomerById,

} = require("../controller/customer");

router.route("/").post(createCustomers);

router.route("/verify/:token").get(verifyEmail);

router.route("/signin").post(customerSignin);

router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyResetCode").put(verifyResetCode);
router.route("/updatePassword").put(updatePassword);
router.route("/expo").put(getExpoToken);
router.route("/notification").get(checkNotification);
router.route("/all").get( getAllCustomers);
router.route("/:id").get(getOneCustomers);
router.route("/ban/:id").patch(banCustomerById);
router.route("/unban/:id").patch(unbanCustomerById);

router.route("/").get(getLoggedInUser);
module.exports = router;
