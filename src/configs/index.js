const serverConfig = require('./server.config');
const dbConfig = require('./db.config');
const jwtConfig = require('./jwt.config');
const stripeConfig = require('./stripe.config');
const webhooksConfig = require('./webhooks.config');

exports.server = serverConfig;
exports.database = dbConfig;
exports.jwt = jwtConfig;
exports.stripe = stripeConfig;
exports.webhooks = webhooksConfig;
