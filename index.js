// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const indexRoutes = require("./routes/index");
const { graphqlHTTP } = require("express-graphql");

// Import GraphQL schema and resolvers
// const schema = require("./graphql/schema");
const rootResolver = require("./graphql/resolvers");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  scalar Date

  type DeliveryTime {
    min: Int!
    max: Int!
  }

  type Restaurant {
    id: ID!
    name: String!
    description: String
    address: String!
    phone: String!
    email: String!
    logo: String
    coverImage: String
    deliveryTime: DeliveryTime!
    rating: Float
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input RestaurantInput {
    name: String!
    description: String
    address: String!
    phone: String!
    email: String!
    logo: String
    coverImage: String
    deliveryTime: DeliveryTimeInput!
    isActive: Boolean
  }

  input RestaurantUpdateInput {
    name: String
    description: String
    address: String
    phone: String
    email: String
    logo: String
    coverImage: String
    deliveryTime: DeliveryTimeInput
    isActive: Boolean
  }

  input DeliveryTimeInput {
    min: Int!
    max: Int!
  }

  type Menu {
    id: ID!
    name: String!
    description: String
    thumbnail: String
    price: Float!
    category: String!
    restaurantId: ID!
    isAvailable: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input MenuInput {
    name: String!
    description: String
    thumbnail: String
    price: Float!
    category: String!
    restaurantId: ID!
    isAvailable: Boolean
  }

  input MenuUpdateInput {
    name: String
    description: String
    thumbnail: String
    price: Float
    category: String
    isAvailable: Boolean
  }

  type User {
    id: ID!
    name: String!
    bio: String
    avatar: String
    email: String!
    password: String
    address: String
    phone: String
    role: String
    createdAt: Date!
    updatedAt: Date!
  }

  input UserInput {
    name: String!
    bio: String
    avatar: String
    email: String!
    password: String!
    address: String
    phone: String
    role: String
  }

  input UserUpdateInput {
    name: String
    bio: String
    avatar: String
    email: String
    password: String
    address: String
    phone: String
    role: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type RestaurantOwner {
    id: ID!
    userId: ID!
    restaurantId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input RestaurantOwnerInput {
    userId: ID!
    restaurantId: ID!
  }

  input RestaurantOwnerUpdateInput {
    userId: ID
    restaurantId: ID
  }

  type PaymentMethod {
    id: ID!
    name: String!
    description: String
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input PaymentMethodInput {
    name: String!
    description: String
    isActive: Boolean
  }

  input PaymentMethodUpdateInput {
    name: String
    description: String
    isActive: Boolean
  }

  type OrderItem {
    menu: ID!
    quantity: Int!
  }

  input OrderItemInput {
    menu: ID!
    quantity: Int!
  }

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

  type Review {
    id: ID!
    rating: Int!
    comment: String
    userId: ID!
    restaurantId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input ReviewInput {
    rating: Int!
    comment: String
    userId: ID!
    restaurantId: ID!
  }

  input ReviewUpdateInput {
    rating: Int
    comment: String
  }

  type Settings {
    id: ID!
    restaurantId: ID!
    theme: String!
    language: String!
    notifications: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input SettingsInput {
    restaurantId: ID!
    theme: String!
    language: String!
    notifications: Boolean!
  }

  input SettingsUpdateInput {
    theme: String
    language: String
    notifications: Boolean
  }

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

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    role: String!
  }

  type Query {
    # Restaurant queries
    restaurants: [Restaurant!]!
    restaurant(id: ID!): Restaurant
    restaurantsByOwner(ownerId: ID!): [Restaurant!]!
    
    # Menu queries
    menus: [Menu!]!
    menu(id: ID!): Menu
    menusByRestaurant(restaurantId: ID!): [Menu!]!
    menusByCategory(category: String!): [Menu!]!
    
    # User queries
    users: [User!]!
    user(id: ID!): User
    
    # RestaurantOwner queries
    restaurantOwners: [RestaurantOwner!]!
    restaurantOwner(id: ID!): RestaurantOwner
    restaurantOwnerByUserId(userId: ID!): RestaurantOwner
    
    # PaymentMethod queries
    paymentMethods: [PaymentMethod!]!
    paymentMethod(id: ID!): PaymentMethod
    
    # Order queries
    orders: [Order!]!
    order(id: ID!): Order
    ordersByUser(userId: ID!): [Order!]!
    ordersByRestaurant(restaurantId: ID!): [Order!]!
    
    # Cart queries
    carts: [Cart!]!
    cart(id: ID!): Cart
    cartByUser(userId: ID!): Cart
    
    # Review queries
    reviews: [Review!]!
    review(id: ID!): Review
    reviewsByUser(userId: ID!): [Review!]!
    reviewsByRestaurant(restaurantId: ID!): [Review!]!
    
    # Settings queries
    allSettings: [Settings!]!
    settings(id: ID!): Settings
    settingsByRestaurant(restaurantId: ID!): Settings
    
    # Coupon queries
    coupons: [Coupon!]!
    coupon(id: ID!): Coupon
    couponByCode(code: String!): Coupon
  }

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
    login(input: UserLoginInput!): AuthData!
    
    # RestaurantOwner mutations
    createRestaurantOwner(input: RestaurantOwnerInput!): RestaurantOwner!
    updateRestaurantOwner(id: ID!, input: RestaurantOwnerUpdateInput!): RestaurantOwner!
    deleteRestaurantOwner(id: ID!): Boolean!
    
    # PaymentMethod mutations
    createPaymentMethod(input: PaymentMethodInput!): PaymentMethod!
    updatePaymentMethod(id: ID!, input: PaymentMethodUpdateInput!): PaymentMethod!
    deletePaymentMethod(id: ID!): Boolean!
    
    # Order mutations
    createOrder(input: OrderInput!): Order!
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
`);


const app = express();
const PORT = config.port;

// Connect to MongoDB
mongoose.connect(config.database.uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API Routes
app.use("/api", indexRoutes);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true, // Enable GraphiQL interface for testing
  })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: config.env === "development" ? err.message : {},
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${config.env} mode`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
