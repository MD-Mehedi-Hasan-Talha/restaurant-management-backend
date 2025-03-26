const { gql } = require("graphql-tag");

const Coupon = gql`
  scalar Date

  type Coupon {
    id: ID!
    code: String!
    discount: Float!
    restaurantId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input CouponInput {
    code: String!
    discount: Float!
    restaurantId: ID!
  }

  input CouponUpdateInput {
    code: String
    discount: Float
  }
`;

module.exports = Coupon;
