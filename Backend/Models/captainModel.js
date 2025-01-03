const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 2 character long"],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "color must be at least 2 character long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "color must be at least 2 character long"],
    },
    type: {
      type: String,
      enum: ["auto", "bike", "car"],
      required: true,
    },
  },
  rating: {
    type: Number,
    default: 0,
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const CaptainModel = mongoose.model("Captain", captainSchema);

module.exports = CaptainModel;
