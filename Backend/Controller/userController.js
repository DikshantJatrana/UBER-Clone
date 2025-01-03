const userModel = require("../Models/userModel");
const { validationResult } = require("express-validator");
const { setUser } = require("../Config/jwt");

const handleUserRegistation = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    res.status(400).json({ errors: error.array() });
  }
  const { fullName, email, password } = req.body;
  if (!fullName || !fullName.firstName || !email || !password) {
    res.status(400).send("invalid details");
  }
  console.log(req.body);
  const hashPassword = await userModel.hashPassword(password);
  const user = userModel.create({
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
  if (!error.isEmpty) {
    es.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({ msg: "invalid email and password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }
  const token = setUser(user);
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports = { handleUserRegistation, handleUserLogin };
