const { gql } = require("graphql-tag");
const OrderItem = require("./OrderItem");

const Order = gql`
  ${OrderItem}

  type Order {
    id: ID!
    items: [OrderItem!]!
    status: String!
    deliveryTime: Int
    userId: ID!
    couponId: ID
    createdAt: Date!
    updatedAt: Date!
  }

  input OrderInput {
    items: [OrderItemInput!]!
    userId: ID!
    couponId: ID
  }

  input OrderUpdateInput {
    status: String
    deliveryTime: Int
  }
`;

module.exports = Order;