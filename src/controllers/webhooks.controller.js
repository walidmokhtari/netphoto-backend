const config = require("../configs");
const stripeKey = config.stripe.key;
const stripe = require("stripe")(stripeKey);
const User = require('../models/user.model');

exports.stripewebhook = (req, res) => {

  let data;
  let eventType;
 console.log("stripe == ", stripeKey);

  const webhookSecret = process.env.WEBHOOKSECRET;

  if (webhookSecret) {

    let event;
    let signature = req.headers["stripe-signature"];
    console.log("sign ==", signature);
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      //console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {

    case "payment_intent.succeeded":

        User.findByIdAndUpdate(data.object.metadata.userId, {subscription: "premium"}, {
            new: true,
        })
        .then(() => {
            console.log("Succceessssssss")
        })
        .catch(() => {
            console.log("Errrrooooooorrr")
        })
    
      break;
    
    default:
      
  }
  res.sendStatus(200);
};