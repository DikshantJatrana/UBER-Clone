const rideModel = require("../Models/rideModel");
const { validationResult } = require("express-validator");
const { getDistanceAndTime } = require("../Controller/mapsController");
const crypto = require("crypto");

const calculateFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const baseFare = {
    auto: 30,
    bike: 20,
    car: 50,
  };

  const perKmRate = {
    auto: 10,
    bike: 5,
    car: 15,
  };

  const perMinuteRate = {
    auto: 1,
    bike: 0.5,
    car: 2,
  };

  const { distance, duration } = await getDistanceAndTime(pickup, destination);
  const distanceInKm = parseFloat(distance.replace(" km", ""));
  const durationInMinutes = parseFloat(duration.replace(" mins", ""));

  const fares = {
    auto:
      baseFare.auto +
      perKmRate.auto * distanceInKm +
      perMinuteRate.auto * durationInMinutes,
    bike:
      baseFare.bike +
      perKmRate.bike * distanceInKm +
      perMinuteRate.bike * durationInMinutes,
    car:
      baseFare.car +
      perKmRate.car * distanceInKm +
      perMinuteRate.car * durationInMinutes,
  };

  return fares;
};

const getOpt = (num) => {
  const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
  return otp;
};

const createRide = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array });
  }
  const { pickup, destination, vehicleType } = req.body;
  if (!pickup || !destination || !vehicleType) {
    throw new Error("invalid details");
  }
  try {
    const fares = await calculateFare(pickup, destination);
    const ride = await rideModel.create({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      otp: getOpt(6),
      fare: fares[vehicleType],
    });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createRide };
