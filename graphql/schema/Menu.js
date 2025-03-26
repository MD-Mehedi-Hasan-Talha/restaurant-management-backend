const { gql } = require("graphql-tag");

const Menu = gql`
  scalar Date

  type Menu {
    id: ID!
    name: String!
    description: String
    thumbnail: String
    price: Float!
    restaurant: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input MenuInput {
    name: String!
    description: String
    thumbnail: String
    price: Float!
    restaurant: ID!
  }

  input MenuUpdateInput {
    name: String
    description: String
    thumbnail: String
    price: Float
    restaurant: ID
  }
`;

module.exports = Menu;