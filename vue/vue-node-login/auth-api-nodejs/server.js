const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.port || 3000;

const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

app.use(cors());
app.use(express.json());
app.use(jwt());
app.use(errorHandler);
app.use(express.static(__dirname + "/public"));
const dbo = require("./db/conn");

app.use("/api", require("./routes/users"));
// app.use("/users", require("./users/users.controller"));

app.listen(port, () => {
  dbo.connectToServer((err) => {
    // if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
