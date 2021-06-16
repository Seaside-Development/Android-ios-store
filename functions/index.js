const functions = require('firebase-functions')
const stripeClient = require("stripe")(functions.config().stripe.key)
