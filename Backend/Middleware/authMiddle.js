const userModel = require("../Models/userModel");
const { getUser } = require("../Config/jwt");
const blackListedModel = require("../Models/blackListedModel");
const CaptainModel = require("../Models/captainModel");

const Authuser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }
    const isBlackListed = await blackListedModel.findOne({ token });
    if (isBlackListed) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Token is blacklisted" });
    }
    const decode = getUser(token);
    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Error in Authuser middleware:", err.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const Authcaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const isBlackListed = await blackListedModel.findOne({ token });
    if (isBlackListed) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Token is blacklisted" });
    }

    const decode = getUser(token);
    const captain = await CaptainModel.findById(decode.id);
    if (!captain) {
      return res.status(404).json({ msg: "Captain not found" });
    }

    req.captain = captain;
    next();
  } catch (err) {
    console.error("Error in Authcaptain middleware:", err.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports = { Authuser, Authcaptain };
