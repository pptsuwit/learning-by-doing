const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
app.use(express.static(__dirname + "/public"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "file-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
const upload = multer({ storage: storage });
const userService = require("../services/auth.service");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const { ObjectId } = require("bson");

recordRoutes.get("/image/:filename", function (req, res) {
  // console.log(
  //   path.join(__dirname, "..", "public", "uploads", req.params.filename)
  // );
  res.send(
    path.join(__dirname, "..", "public", "uploads", req.params.filename)
  );
});

recordRoutes.post("/login", authenticate);
recordRoutes.get("/users", getAll);
recordRoutes.put("/update", upload.single("file"), function (req, response) {
  let id = { _id: ObjectId(req.body.id) };
  const newValue = {
    $set: {
      fullname: req.body.fullname,
      telephone: req.body.telephone,
      email: req.body.email,
      avatar: req.file,
    },
  };
  dbo
    .getDB()
    .collection("users")
    .updateOne(id, newValue, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});
recordRoutes.post("/register", upload.single("avatar"), (req, res, next) => {
  let filepath = "";
  // if (req.file) {
  //   filepath = path.join(
  //     __dirname,
  //     "..",
  //     "public",
  //     "uploads",
  //     req.file.filename
  //   );
  // }
  if (req.file) {
    filepath = req.file.filename;
  }
  const user = {
    fullname: req.body.fullname,
    password: req.body.password,
    avatar: filepath,
    telephone: req.body.telephone,
    email: req.body.email,
  };
  dbo
    .getDB()
    .collection("users")
    .insertOne(user, function (err) {
      if (err) throw err;
      res.json(user);
    });
});
recordRoutes.delete("/:id", function (req, response) {
  let id = { _id: ObjectId(req.params.id) };
  dbo
    .getDB()
    .collection("users")
    .deleteOne(id, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
}
function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = recordRoutes;
