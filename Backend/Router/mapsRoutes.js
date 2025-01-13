const express = require("express");
const { Authuser } = require("../Middleware/authMiddle");
const {
  getAddressCoordinateGoMaps,
  getDistance,
  getAutoSuggestions,
} = require("../Controller/mapsController");
const router = express.Router();
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  [query("address").isString({ min: 3 })],
  Authuser,
  getAddressCoordinateGoMaps
);

router.get(
  "/get-distance-time",
  query("origins").isString().isLength({ min: 3 }),
  query("destinations").isString().isLength({ min: 3 }),
  Authuser,
  getDistance
);

router.get(
  "/get-suggestions",
  [
    query("input")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Input is required and must be at least 1 character"),
  ],
  Authuser,
  getAutoSuggestions
);

module.exports = router;
