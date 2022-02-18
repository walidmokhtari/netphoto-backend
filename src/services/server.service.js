const express = require('express');
const bodyParser = require('body-parser');
const config = require("../configs");
var cors = require('cors');
const port = config.server.port;
const apiRouter = require('../routes');
const { ApolloServer, gql } = require("apollo-server-express");

const movieSchema = require("../apollo/schemas/movie.schema");
const categorieSchema = require("../apollo/schemas/categorie.schema");

const movieResolver = require("../apollo/resolvers/movie.resolver");
const categorieResolver = require("../apollo/resolvers/categorie.resolver");



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
    typeDefs: [movieSchema, categorieSchema],
    resolvers: [movieResolver, categorieResolver]
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
