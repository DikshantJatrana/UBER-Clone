const rideModel = require("../Models/rideModel");
const { validationResult } = require("express-validator");
const {
  getDistanceAndTime,
  getcaptainInRadius,
  getCoordinatesFromAddress,
} = require("../Controller/mapsController");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

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

  return { fares, distance, duration };
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
    const { fares, distance, duration } = await calculateFare(
      pickup,
      destination
    );
    const ride = await rideModel.create({
      user: req.user._id,
      pickup,
      destination,
      distance,
      duration,
      vehicleType,
      otp: getOpt(6),
      fare: fares[vehicleType],
    });
    res.status(201).json(ride);
    const pickupCoordinates = await getCoordinatesFromAddress(pickup);
    const captains = await getcaptainInRadius(
      pickupCoordinates.location.lat,
      pickupCoordinates.location.lng,
      4
    );
    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    captains.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "newRide",
        data: rideWithUser,
      });
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred after response was sent:", error);
    }
  }
};

const calFare = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array });
  }
  const { pickup, destination } = req.query;
  if (!pickup || !destination) {
    throw new Error("invalid details");
  }
  try {
    const fares = await calculateFare(pickup, destination);
    return res.status(200).json(fares);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const confirmRide = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array });
  }
  const { rideId } = req.body;
  if (!rideId) {
    throw new Error("invalid ride id");
  }
  try {
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { captain: req.captain, status: "accepted" }
    );
    if (!ride) {
      throw new Error("ride not found");
    }
    if (ride.captain) {
      throw new Error("ride already confirmed");
    }
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user")
      .populate("captain")
      .select("+otp");

    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideConfirmed",
      data: rideWithUser,
    });
    return res.status(200).json(rideWithUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const startRide = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { rideId, otp } = req.query;

  if (!rideId || !otp) {
    return res.status(400).json({ error: "Invalid details" });
  }

  try {
    const ride = await rideModel.findOne({ _id: rideId }).select("+otp");
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }
    if (String(ride.otp) !== String(otp)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    ride.status = "ongoing";
    await ride.save();

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user")
      .populate("captain");

    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideStarted",
      data: rideWithUser,
    });

    return res.status(200).json(rideWithUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const endRide = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { rideId } = req.body;
    if (!rideId) {
      throw new Error("invalid ride id");
    }
    const ride = await rideModel.findOne({
      _id: rideId,
      captain: req.captain._id,
    });
    if (!ride) {
      throw new Error("ride not found");
    }
    ride.status = "completed";
    await ride.save();
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user")
      .populate("captain");
    sendMessageToSocketId(rideWithUser.user.socketId, {
      event: "rideEnded",
      data: rideWithUser,
    });
    return res.status(200).json(rideWithUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createRide, calFare, confirmRide, startRide, endRide };
