const { gql } = require("graphql-tag");

const OrderItem = gql`
  type OrderItem {
    menu: ID!
    quantity: Int!
  }
`;

module.exports = OrderItem;
