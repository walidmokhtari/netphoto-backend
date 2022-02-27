const config = require("../configs");
const stripeKey = config.stripe.key;
const stripe = require("stripe")(stripeKey);

const initiateStripeSession = async (req) => {

    const subscriptionData = [{
      price_data: {
        currency: "eur",
        product_data: {name: req.body.subscription},
        unit_amount: req.body.total ,
      },
      quantity: 1,
    }]
    
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: subscriptionData,
    payment_intent_data: {
      metadata: { userId: req.user.id, subscriptionData: req.body.subscription },
    },
    mode: "payment",
    success_url: `${process.env.URL_CLIENT}subscription/confirmation`,
    cancel_url: `${process.env.URL_CLIENT}subscription`,
  });
  return session;
};

exports.createSession = async function (req, res) {
  try {
    const session = await initiateStripeSession(req);
    res.status(200).json({
      id: session.id,
      price: session.amout_total,
      currency: session.currency,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};