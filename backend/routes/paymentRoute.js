const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  checkoutsession,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthentiactedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthentiactedUser,processPayment);

router.route("/stripeapikey").get( sendStripeApiKey);
router.route("/create-checkout-session").post(checkoutsession);

module.exports = router;
