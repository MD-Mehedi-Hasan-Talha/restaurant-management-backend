const { gql } = require("graphql-tag");

const PaymentMethod = gql`
  type PaymentMethod {
    id: ID!
    name: String!
    description: String
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input PaymentMethodInput {
    name: String!
    description: String
    isActive: Boolean
  }

  input PaymentMethodUpdateInput {
    name: String
    description: String
    isActive: Boolean
  }
`;

module.exports = PaymentMethod;