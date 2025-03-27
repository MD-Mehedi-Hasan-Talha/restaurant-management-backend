const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

// User routes
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/email/:email", getUserByEmail);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

// User authentication route
router.post("/login", login);

module.exports = router;
