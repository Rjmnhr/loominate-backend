const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Cors = require("cors");
const otpAuth = require("./routes/otp-auth");
const user = require("./routes/user");

//App config
const app = express();
const port = process.env.PORT || 8002;

//middleware
dotenv.config();
app.use(Cors());
app.use(express.json());

//DB config
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/api/otp", otpAuth);
app.use("/api/user", user);

app.listen(port, () => console.log(`server is up on ${port}`));
