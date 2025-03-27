const { gql } = require("graphql-tag");

const Review = gql`
  type Review {
    id: ID!
    rating: Int!
    reviewText: String
    reviewerId: ID!
    restaurantId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input ReviewInput {
    rating: Int!
    reviewText: String
    reviewerId: ID!
    restaurantId: ID!
  }

  input ReviewUpdateInput {
    rating: Int
    reviewText: String
  }
`;

module.exports = Review;