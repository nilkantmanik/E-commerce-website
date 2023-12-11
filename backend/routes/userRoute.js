const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUserdetail,
  updateRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthentiactedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthentiactedUser, updatePassword);
router.route("/me/update").put(isAuthentiactedUser, updateProfile);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthentiactedUser, getUserDetails);

router
  .route("/admin/users")
  .get(isAuthentiactedUser, authorizeRole("admin"), getAllUsers);
  


router
  .route("/admin/user/:id")
  .get(isAuthentiactedUser, authorizeRole("admin"), getSingleUserdetail)
  .delete(isAuthentiactedUser, authorizeRole("admin"), deleteUser)
  .put(isAuthentiactedUser, authorizeRole("admin"), updateRole);

module.exports = router;


