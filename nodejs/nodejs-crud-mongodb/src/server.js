const express = require("express");
const cors = require("cors");
const bordyParser = require("body-parser");
require("./config/database");
const contactRoutes = require("./routes/contact.route");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(bordyParser.urlencoded());
app.use(bordyParser.json());

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.use("/api", contactRoutes);
