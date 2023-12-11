const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthentiactedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get( getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthentiactedUser, authorizeRole("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthentiactedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthentiactedUser, authorizeRole("admin"), deleteProduct);
// router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getProduct);
router.route("/review").put(isAuthentiactedUser,createReview);
router.route("/review").get(getAllReviews);
router.route("/review").delete(isAuthentiactedUser,deleteReview);

module.exports = router;
