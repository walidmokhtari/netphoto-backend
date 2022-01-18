const mongoose = require("mongoose");
const config = require("../configs");
const uri = config.database.uri;

exports.dbConnect = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then(() => {
        console.log("Successfully connected to the database")
    }).catch((err) => {
        console.log(`couldnt connect to the database, ${err}`);
        process.exit();
    })
}
