const userModel = require("../Models/userModel");
const { validationResult } = require("express-validator");
const { setUser } = require("../Config/jwt");
const BlackListedTokenModel = require("../Models/blackListedModel");

const handleUserRegistation = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullName, email, password } = req.body;
  if (!fullName || !fullName.firstName || !email || !password) {
    return res.status(400).send("invalid details");
  }
  const isUserAlreadyThere = await userModel.findOne({ email });
  if (isUserAlreadyThere) {
    return res.status(400).json({ msg: "user already exists" });
  }
  const hashPassword = await userModel.hashPassword(password);
  const user = await userModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email,
    password: hashPassword,
  });
  const token = setUser(user);
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

const handleUserLogin = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ msg: "invalid email and password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }
  const token = setUser(user);
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};

const logoutUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  res.clearCookie("token");
  if (!token) {
    return res.status(200).json({ msg: "Logged out successfully" });
  }
  const isBlackListed = await BlackListedTokenModel.findOne({ token });
  if (!isBlackListed) {
    await BlackListedTokenModel.create({ token });
    return res.status(200).json({ msg: "Logged out successfully" });
  } else {
    return res.status(401).json({ msg: "Unauthorized: Token is blacklisted" });
  }
};

module.exports = {
  handleUserRegistation,
  handleUserLogin,
  getUserProfile,
  logoutUser,
};
