const { gql } = require("graphql-tag");

const RestaurantOwner = gql`
  type RestaurantOwner {
    id: ID!
    userId: ID!
    restaurantId: ID!
    area: String!
    currency: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input RestaurantOwnerInput {
    userId: ID!
    restaurantId: ID!
    area: String!
    currency: String!
  }

  input RestaurantOwnerUpdateInput {
    area: String
    currency: String
  }
`;

module.exports = RestaurantOwner;