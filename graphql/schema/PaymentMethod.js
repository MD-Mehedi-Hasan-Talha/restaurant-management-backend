const { gql } = require("graphql-tag");

const PaymentMethod = gql`
  scalar Date

  type PaymentMethod {
    id: ID!
    name: String!
    cardNumber: Float!
    expiryDate: Date!
    cvv: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input PaymentMethodInput {
    name: String!
    cardNumber: Float!
    expiryDate: Date!
    cvv: String!
  }

  input PaymentMethodUpdateInput {
    name: String
    cardNumber: Float
    expiryDate: Date
    cvv: String
  }
`;

module.exports = PaymentMethod;