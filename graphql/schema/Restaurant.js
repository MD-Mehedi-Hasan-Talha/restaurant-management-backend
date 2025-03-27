const { gql } = require("graphql-tag");

const Restaurant = gql`
  type DeliveryTime {
    min: Int!
    max: Int!
  }

  type Restaurant {
    id: ID!
    name: String!
    description: String!
    thumbnail: String
    gallery: [String]
    location: String!
    owner: ID!
    deliveryTime: DeliveryTime!
    deliveryCharge: Float!
    tags: [ID]
    createdAt: Date!
    updatedAt: Date!
  }

  input DeliveryTimeInput {
    min: Int!
    max: Int!
  }

  input RestaurantInput {
    name: String!
    description: String!
    thumbnail: String
    gallery: [String]
    location: String!
    owner: ID!
    deliveryTime: DeliveryTimeInput!
    deliveryCharge: Float!
    tags: [ID]
  }

  input RestaurantUpdateInput {
    name: String
    description: String
    thumbnail: String
    gallery: [String]
    location: String
    deliveryTime: DeliveryTimeInput
    deliveryCharge: Float
    tags: [ID]
  }
`;

module.exports = Restaurant;