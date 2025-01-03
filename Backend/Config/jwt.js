const jwt = require("jsonwebtoken");
const Secret = process.env.JWT_SECRET;

function setUser(user) {
  const plainTxt = { id: user._id, email: user.email };
  return jwt.sign(plainTxt, Secret);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, Secret);
}

module.exports = { getUser, setUser };
