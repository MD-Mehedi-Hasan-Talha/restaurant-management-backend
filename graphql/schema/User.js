const { gql } = require("graphql-tag");

const User = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    bio: String
    avatar: String
    email: String!
    password: String!
    address: String
    phone: String
    createdAt: Date!
    updatedAt: Date!
  }

  input UserInput {
    name: String!
    bio: String
    avatar: String
    email: String!
    password: String!
    address: String
    phone: String
  }

  input UserUpdateInput {
    name: String
    bio: String
    avatar: String
    email: String
    password: String
    address: String
    phone: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }
`;

module.exports = User;