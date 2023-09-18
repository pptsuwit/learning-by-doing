const mongoose = require("mongoose");

const url = "mongodb+srv://tiiuuyx:Bg2T1mZJbQLaIiYo@clusterforlean0.xdzigad.mongodb.net/xsf_db?retryWrites=true&w=majority";
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Database connection failed", err);
});
db.once("open", () => {
  console.log("Database connection successful");
});

module.exports = db;
