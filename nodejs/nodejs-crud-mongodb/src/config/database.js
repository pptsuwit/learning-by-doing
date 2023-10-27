const mongoose = require("mongoose");

const url = "";
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Database connection failed", err);
});
db.once("open", () => {
  console.log("Database connection successful");
});

module.exports = db;
