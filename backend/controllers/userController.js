const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel");

const sendToken = require("../util/jwtToken");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//   // const {name,email,password} = req.body;

//   const user = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     avatar: {
//       public_id: "this is a sample id",
//       url: "profile pic url",
//     },
//   });

//   sendToken(user, 201, res);
// });

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  // const {email,password}=req.body;
  // checking if user has given password and email both
  if (!req.body.email || !req.body.password) {
    return next(new ErrorHandler("Enter valid email & password", 400));
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(req.body.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout user

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// forget password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `E-commerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or has expired", 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(" Passwords do not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avupdated === "true") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users--admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user --admin
exports.getSingleUserdetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role -- admin
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// delete user -- admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // we will remove cloudinary later

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`)
    );
  }

  // await User.remove();
  await user.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "User deleted succesfully",
  });
});
