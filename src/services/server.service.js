const express = require('express');
const bodyParser = require('body-parser');
const config = require("../configs");
var cors = require('cors');
const port = config.server.port;
const apiRouter = require('../routes');
const { ApolloServer, gql } = require("apollo-server-express");

const schemas = require("../apollo/schemas/movie.schema");

const resolvers = require("../apollo/resolvers/movie.resolver");


//My app created by express
const app = express();
//Acces autorization
app.use(cors());
//Body requests control
app.use(bodyParser.json());
//Routers
app.use('/api/v1/',apiRouter);

//GraphQl config
const graphQlServer =  new ApolloServer({
    typeDefs: schemas,
    resolvers
})
graphQlServer.applyMiddleware({ app, path: "/graphql" })


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
