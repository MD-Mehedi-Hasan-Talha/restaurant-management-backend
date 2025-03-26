// Load environment variables
require("dotenv").config();

const express = require("express");
const config = require("./config/config");
const indexRoutes = require("./routes/index");
const { graphqlHTTP } = require("express-graphql");

// Import GraphQL schema and resolvers
const schema = require("./graphql/schema");
const rootResolver = require("./graphql/resolvers");

const app = express();
const PORT = config.port;

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
