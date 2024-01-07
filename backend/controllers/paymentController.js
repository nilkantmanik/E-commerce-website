const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "E-commerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

// checkout api
// app.post("/api/create-checkout-session",

exports.checkoutsession = catchAsyncErrors(async (req, res) => {
  const { products } = req.body;

  // console.log("products", products);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "INR",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    customer_email: "customer@example.com",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
  });

  res.json({ id: session.id });
});
