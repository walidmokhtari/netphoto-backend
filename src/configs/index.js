const serverConfig = require('./server.config');
const dbConfig = require('./db.config');
const jwtConfig = require('./jwt.config');

exports.server = serverConfig;
exports.database = dbConfig;
exports.jwt = jwtConfig;