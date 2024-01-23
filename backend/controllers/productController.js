const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../util/apifeatures");

const cloudinary = require("cloudinary");

//create Product  --- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // req.body.user = req.user.id;

  // const product = await Product.create(req.body);

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// getAllProducts

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultperpage = 8;
  const productCount = await Product.countDocuments();
  let qr = { ...req.query };
  const apifeature = new ApiFeatures(Product.find(), qr).search().filter();

  let pros = await apifeature.query;

  let filteredProductsCount = pros.length;

  const apif = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);

  let products = await apif.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultperpage,
    filteredProductsCount,
  });
});

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// update ---Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product -- admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.deleteOne({ _id: req.params.id });
  // await Product.deleteOne(product);

  res.status(200).json({
    success: true,
    message: "product is removed",
  });
});

// get product details

exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);


  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// create or update a product review

exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all reviews
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete a review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  const remainingReviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );


  // if (remainingReviews.length === 0) {
  //   return next(new ErrorHandler("review Not found", 404));
  // }

  let avgRating = 0;

  remainingReviews.forEach((rev) => {
    avgRating += rev.rating;
  });

  let newRatings=0;
  
  if(remainingReviews.length===0)
  {
    newRatings=0;
  }else{
    newRatings=avg/remainingReviews.length;
  }

  // newRatings =remainingReviews.length > 0 ? avgRating / remainingReviews.length : 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews: remainingReviews,
      ratings: newRatings,
      numOfReviews: remainingReviews.length,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
  });
});

// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.productId);

//   if (!product) {
//     return next(new ErrorHandler("Product Not found", 404));
//   }

//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   const ratings = reviews.length > 0 ? avgRating / reviews.length : 0;

//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     { reviews, ratings, numOfReviews },
//     { new: true, runValidators: true, useFindAndModify: false }
//   );

//   res.status(200).json({
//     success:true
//   })
// });
