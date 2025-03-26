const { gql } = require("graphql-tag");

// Import all schema types
const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const User = require("./User");
const RestaurantOwner = require("./RestaurantOwner");
const PaymentMethod = require("./PaymentMethod");
const Order = require("./Order");
const Cart = require("./Cart");
const Review = require("./Review");
const Settings = require("./Settings");
const Coupon = require("./Coupon");
const Query = require("./Query");
const Mutation = require("./Mutation");

// Define the root schema with Query and Mutation types
const rootSchema = gql`
  scalar Date

  ${Restaurant}
  ${Menu}
  ${User}
  ${RestaurantOwner}
  ${PaymentMethod}
  ${Order}
  ${Cart}
  ${Review}
  ${Settings}
  ${Coupon}
  ${Query}
  ${Mutation}


  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
`;

module.exports = rootSchema;
