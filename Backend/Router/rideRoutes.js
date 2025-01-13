const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const {
  createRide,
  calFare,
  confirmRide,
  startRide,
  endRide,
} = require("../Controller/rideController");
const { Authuser, Authcaptain } = require("../Middleware/authMiddle");

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

router.get(
  "/calFare",
  Authuser,
  query("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickup"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup"),
  calFare
);

router.post(
  "/confirmRide",
  Authcaptain,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  confirmRide
);

router.get(
  "/start-ride",
  Authcaptain,
  query("rideId").isMongoId(),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("invalid otp"),
  startRide
);

router.post("/end-ride", Authcaptain, body("rideId").isMongoId(), endRide);

module.exports = router;
