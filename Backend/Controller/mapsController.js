const axios = require("axios");
const { validationResult } = require("express-validator");
const CaptainModel = require("../Models/captainModel");

const getDistanceAndTime = async (origin, destination) => {
  const apiKey = process.env.GO_MAP_API;
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      if (element.status === "OK") {
        return {
          distance: element.distance.text,
          duration: element.duration.text,
        };
      } else {
        throw new Error(`Unable to calculate distance: ${element.status}`);
      }
    } else {
      throw new Error(
        response.data.error_message || "Failed to fetch distance"
      );
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.error_message ||
        error.message ||
        "An error occurred while fetching distance"
    );
  }
};

const getcaptainInRadius = async (latitude, longitude, radiusInKm) => {
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
  console.log("Radius in KM:", radiusInKm);

  try {
    const captains = await CaptainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radiusInKm / 6371],
        },
      },
    });
    return captains;
  } catch (error) {
    console.error("Error in getcaptainInRadius:", error.message);
    throw new Error("Could not fetch captains in radius");
  }
};

const getAddressCoordinateGoMaps = async (req, res, next) => {
  const { address } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const apiKey = process.env.GO_MAP_API;
  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing" });
  }
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?key=${apiKey}&address=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return res.json({
        latitude: location.lat,
        longitude: location.lng,
      });
    } else {
      console.error("API response error:", response.data);
      return res.status(500).json({
        error: response.data.error_message || "Failed to fetch coordinates",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching coordinates:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      error: "An error occurred while fetching coordinates",
    });
  }
};

const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.GO_MAP_API;
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?key=${apiKey}&address=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        location,
      };
    } else {
      throw new Error(
        response.data.error_message || "Failed to fetch coordinates"
      );
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.error_message ||
        error.message ||
        "An error occurred while fetching coordinates"
    );
  }
};

const getDistance = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origins, destinations } = req.query;
  const apiKey = process.env.GO_MAP_API;
  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing" });
  }
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origins
  )}&destinations=${encodeURIComponent(destinations)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      if (element.status === "OK") {
        return res.json({
          distance: element.distance.text,
          duration: element.duration.text,
        });
      } else {
        return res.status(400).json({
          error: `Unable to calculate distance: ${element.status}`,
        });
      }
    } else {
      console.error("API response error:", response.data);
      return res.status(500).json({
        error: response.data.error_message || "Failed to fetch distance",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching distance:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      error: "An error occurred while fetching distance",
    });
  }
};

const getAutoSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  const apiKey = process.env.GO_MAP_API;

  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing" });
  }
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return res.json(response.data);
    } else {
      console.error("API Response Error:", response.data);
      return res.status(400).json({
        error: response.data.error_message || "Failed to fetch suggestions",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching suggestions:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      error: "An error occurred while fetching suggestions",
    });
  }
};

module.exports = {
  getAddressCoordinateGoMaps,
  getDistance,
  getAutoSuggestions,
  getDistanceAndTime,
  getcaptainInRadius,
  getCoordinatesFromAddress,
};
