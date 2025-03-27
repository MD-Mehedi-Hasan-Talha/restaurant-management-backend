const { gql } = require("graphql-tag");

const Coupon = gql`
  type Coupon {
    id: ID!
    code: String!
    discount: Float!
    maxDiscount: Float
    minOrder: Float
    expiryDate: Date
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input CouponInput {
    code: String!
    discount: Float!
    maxDiscount: Float
    minOrder: Float
    expiryDate: String
    isActive: Boolean
  }

  input CouponUpdateInput {
    code: String
    discount: Float
    maxDiscount: Float
    minOrder: Float
    expiryDate: String
    isActive: Boolean
  }
`;

module.exports = Coupon;
