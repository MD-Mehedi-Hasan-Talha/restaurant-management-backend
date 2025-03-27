const { gql } = require("graphql-tag");

const OrderItem = gql`
  type OrderItem {
    menu: ID!
    quantity: Int!
  }

  input OrderItemInput {
    menu: ID!
    quantity: Int!
  }
`;

module.exports = OrderItem;
