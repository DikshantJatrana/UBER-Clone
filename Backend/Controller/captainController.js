const { setUser } = require("../Config/jwt");
const BlackListedTokenModel = require("../Models/blackListedModel");
const captainModel = require("../Models/captainModel");
const { validationResult } = require("express-validator");

const handleCaptainRegister = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    return res.status(401).json({ msg: "Invalide data" });
  }
  const { fullName, email, password, phone, vehicle } = req.body;

  const isCaptainAlreadyThere = await captainModel.findOne({ email });
  if (isCaptainAlreadyThere) {
    return res.status(400).json({ msg: "user already exists" });
  }

  const hashPassword = await captainModel.hashPassword(password);
  const captain = await captainModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email,
    password: hashPassword,
    phone: phone,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      type: vehicle.type,
    },
  });
  const token = setUser(captain);
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

const handleCaptainLogin = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    res.status(400).json({ errors: error.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    res.status(400).json({ msg: "Invalid email and password found" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    res.status(400).json({ msg: "Invalid email and password found" });
  }
  const token = setUser(captain);
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

const handleCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

const handleCaptainLogout = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  await BlackListedTokenModel.create({ token });
  res.status(200).json({ msg: "captain successfull logout" });
};

module.exports = {
  handleCaptainRegister,
  handleCaptainLogin,
  handleCaptainProfile,
  handleCaptainLogout,
};
