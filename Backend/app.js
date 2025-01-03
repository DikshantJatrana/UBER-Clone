const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./Config/database");
const userRouter = require("./Router/userRouter");

const app = express();
connectToDatabase();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
