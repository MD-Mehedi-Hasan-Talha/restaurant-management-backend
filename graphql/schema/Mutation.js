const { gql } = require("graphql-tag");

const Mutation = gql`
  type Mutation {
    # Restaurant mutations
    createRestaurant(input: RestaurantInput!): Restaurant!
    updateRestaurant(id: ID!, input: RestaurantUpdateInput!): Restaurant!
    deleteRestaurant(id: ID!): Boolean!

    # Menu mutations
    createMenu(input: MenuInput!): Menu!
    updateMenu(id: ID!, input: MenuUpdateInput!): Menu!
    deleteMenu(id: ID!): Boolean!

    # User mutations
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserUpdateInput!): User!
    deleteUser(id: ID!): Boolean!
    loginUser(input: UserLoginInput!): AuthData!

    # RestaurantOwner mutations
    createRestaurantOwner(input: RestaurantOwnerInput!): RestaurantOwner!
    updateRestaurantOwner(
      id: ID!
      input: RestaurantOwnerUpdateInput!
    ): RestaurantOwner!
    deleteRestaurantOwner(id: ID!): Boolean!

    # PaymentMethod mutations
    createPaymentMethod(input: PaymentMethodInput!): PaymentMethod!
    updatePaymentMethod(
      id: ID!
      input: PaymentMethodUpdateInput!
    ): PaymentMethod!
    deletePaymentMethod(id: ID!): Boolean!

    # Order mutations
    createOrder(input: OrderInput!): Order!
    updateOrderStatus(id: ID!, status: String!): Order!
    updateOrder(id: ID!, input: OrderUpdateInput!): Order!
    deleteOrder(id: ID!): Boolean!

    # Cart mutations
    createCart(input: CartInput!): Cart!
    updateCart(id: ID!, input: CartUpdateInput!): Cart!
    deleteCart(id: ID!): Boolean!
    addItemToCart(cartId: ID!, item: OrderItemInput!): Cart!
    removeItemFromCart(cartId: ID!, menuId: ID!): Cart!

    # Review mutations
    createReview(input: ReviewInput!): Review!
    updateReview(id: ID!, input: ReviewUpdateInput!): Review!
    deleteReview(id: ID!): Boolean!

    # Settings mutations
    createSettings(input: SettingsInput!): Settings!
    updateSettings(id: ID!, input: SettingsUpdateInput!): Settings!
    deleteSettings(id: ID!): Boolean!

    # Coupon mutations
    createCoupon(input: CouponInput!): Coupon!
    updateCoupon(id: ID!, input: CouponUpdateInput!): Coupon!
    deleteCoupon(id: ID!): Boolean!
  }
`;

module.exports = Mutation;
