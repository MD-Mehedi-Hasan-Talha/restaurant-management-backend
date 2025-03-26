const { gql } = require("graphql-tag");

const Query = gql`
  type Query {
    # Restaurant queries
    getRestaurant(id: ID!): Restaurant
    getAllRestaurants: [Restaurant!]!
    getRestaurantsByLocation(location: String!): [Restaurant!]!
    getRestaurantsByOwner(ownerId: ID!): [Restaurant!]!

    # Menu queries
    getMenu(id: ID!): Menu
    getAllMenus: [Menu!]!
    getMenusByRestaurant(restaurantId: ID!): [Menu!]!

    # User queries
    getUser(id: ID!): User
    getAllUsers: [User!]!
    getUserByEmail(email: String!): User

    # RestaurantOwner queries
    getRestaurantOwner(id: ID!): RestaurantOwner
    getRestaurantOwnerByUser(userId: ID!): RestaurantOwner
    getRestaurantOwnerByRestaurant(restaurantId: ID!): RestaurantOwner

    # PaymentMethod queries
    getPaymentMethod(id: ID!): PaymentMethod
    getAllPaymentMethods: [PaymentMethod!]!

    # Order queries
    getOrder(id: ID!): Order
    getAllOrders: [Order!]!
    getOrdersByUser(userId: ID!): [Order!]!
    getOrdersByStatus(status: String!): [Order!]!

    # Cart queries
    getCart(id: ID!): Cart
    getCartByUser(userId: ID!): Cart

    # Review queries
    getReview(id: ID!): Review
    getAllReviews: [Review!]!
    getReviewsByRestaurant(restaurantId: ID!): [Review!]!
    getReviewsByUser(userId: ID!): [Review!]!

    # Settings queries
    getSettings(id: ID!): Settings
    getSettingsByRestaurant(restaurantId: ID!): Settings

    # Coupon queries
    getCoupon(id: ID!): Coupon
    getAllCoupons: [Coupon!]!
    getCouponsByRestaurant(restaurantId: ID!): [Coupon!]!
    getCouponByCode(code: String!): Coupon
  }
`;

module.exports = Query;
