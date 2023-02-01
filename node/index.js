const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const cvController = require("./controllers/cvController");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("connected successfully"))
  .catch((err) => {
    console.log("connection to database unsuccessfully");
    console.log(err);
  });

app.post("/register", authController.register);
app.post("/login", authController.login);

app.post("/add/:email", cvController.add);
app.post("/delete", cvController.delete);
app.get("/list", cvController.list);
app.post("/edit", cvController.edit);

app.listen(8002, () => console.log("listening on port 8002"));
