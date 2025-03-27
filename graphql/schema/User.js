const { gql } = require("graphql-tag");

const User = gql`
  type User {
    id: ID!
    name: String!
    bio: String
    avatar: String
    email: String!
    password: String
    address: String
    phone: String
    role: String
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
    role: String
  }

  input UserUpdateInput {
    name: String
    bio: String
    avatar: String
    email: String
    password: String
    address: String
    phone: String
    role: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }
`;

module.exports = User;