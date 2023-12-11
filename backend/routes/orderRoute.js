const express = require("express");
const { isAuthentiactedUser, authorizeRole } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthentiactedUser, newOrder);

router.route("/order/:id").get(isAuthentiactedUser, getSingleOrder);
router.route("/orders/me").get(isAuthentiactedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthentiactedUser, authorizeRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthentiactedUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthentiactedUser, authorizeRole("admin"), deleteOrder);

module.exports = router;
