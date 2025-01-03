const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToDatabase;
