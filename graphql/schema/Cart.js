const { gql } = require("graphql-tag");
const OrderItem = require("./OrderItem");

const Cart = gql`
  ${OrderItem}
  scalar Date

  type Cart {
    id: ID!
    items: [OrderItem!]!
    userId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input CartInput {
    items: [OrderItemInput!]!
    userId: ID!
  }

  input CartUpdateInput {
    items: [OrderItemInput!]
  }

  input OrderItemInput {
    menu: ID!
    quantity: Int!
  }
`;

module.exports = Cart;
