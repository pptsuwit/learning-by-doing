const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to test docker Zzz </h1>");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("test build api running on port 3000");
});
