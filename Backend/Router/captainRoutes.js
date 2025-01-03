const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  handleCaptainRegister,
  handleCaptainLogin,
  handleCaptainProfile,
  handleCaptainLogout,
} = require("../Controller/captainController");
const { Authcaptain } = require("../Middleware/authMiddle");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullName.firstName").notEmpty().withMessage("First name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phone")
      .isLength({ min: 10 })
      .withMessage("phone number should be atleast 10 numbers"),
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
    body("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be a positive integer"),
    body("vehicle.type").notEmpty().withMessage("Vehicle type is required"),
  ],
  handleCaptainRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  handleCaptainLogin
);

router.get("/profile", Authcaptain, handleCaptainProfile);

router.get("/logout", Authcaptain, handleCaptainLogout);

module.exports = router;
