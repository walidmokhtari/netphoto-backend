const express = require('express');
const bodyParser = require('body-parser');
const config = require("../configs");
const port = config.server.port;
const apiRouter = require('../routes');

//My app created by express
const app = express();
//Body requests control
app.use(bodyParser.json());
//Routers
app.use('/api/v1/',apiRouter);


//Launch my app
exports.start = () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(`Error : ${err}`);
            process.exit(-1);
        }
        console.log(`App is running on port : ${port}`);
    });
}
