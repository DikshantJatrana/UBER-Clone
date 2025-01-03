const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSechma = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "first naem must be at least 3 characters"],
    },
    lastName: {
      type: String,
      minlength: [3, "first naem must be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "first naem must be at least 3 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});
userSechma.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSechma.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = new mongoose.model("user", userSechma);

module.exports = userModel;
