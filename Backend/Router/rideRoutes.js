const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { createRide } = require("../Controller/rideController");
const { Authuser } = require("../Middleware/authMiddle");

router.post(
  "/create",
  Authuser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid drop location"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "bike", "car"])
    .withMessage("invalid vehicle type"),
  createRide
);

module.exports = router;
