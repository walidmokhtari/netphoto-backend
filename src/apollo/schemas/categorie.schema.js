const { gql } = require('apollo-server-express');

module.exports = gql`
    type Categorie {
        id: ID
        title: String
    }
    extend type Query {
        getCategories:[Categorie]
        getCategorie(id:ID):Categorie!
    }
    extend type Mutation {
        createCategorie(title:String!):Categorie
        updateCategorie(id:ID!,title:String!):Categorie
    }
`