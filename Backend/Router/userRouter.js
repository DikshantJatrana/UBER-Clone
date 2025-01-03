const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  handleUserRegistation,
  handleUserLogin,
  getUserProfile,
  logoutUser,
} = require("../Controller/userController");
const { Authuser } = require("../Middleware/authMiddle");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name should have at least 3 letters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 letters"),
  ],
  handleUserRegistation
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 letters"),
  ],
  handleUserLogin
);

router.get("/profile", Authuser, getUserProfile);

router.get("/logout", Authuser, logoutUser);
module.exports = router;
