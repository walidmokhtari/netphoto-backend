require('dotenv').config()
const app = require("./src/services/server.service");
const mongo = require("./src/services/mongoose.service");

mongo.dbConnect();
app.start();