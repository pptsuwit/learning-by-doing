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
  res.send(
    path.join(__dirname, "..", "public", "uploads", req.params.filename)
  );
});

recordRoutes.post("/login", authenticate);
recordRoutes.post("/register", (req, res, next) => {
  console.log(req);
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  dbo
    .getDB()
    .collection("users")
    .insertOne(user, function (err) {
      if (err) throw err;
      res.json(user);
    });
});
recordRoutes.get("/users", getAll);
recordRoutes.post("/user", (req, res, next) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  dbo
    .getDB()
    .collection("users")
    .insertOne(user, function (err) {
      if (err) throw err;
      res.json(user);
    });
});
recordRoutes.put("/user", function (req, response) {
  let id = { _id: ObjectId(req.body.id) };
  console.log(req.body.id);
  const newValue = {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
    },
  };
  dbo
    .getDB()
    .collection("users")
    .updateOne(id, newValue, function (err, res) {
      console.log(res);
      if (err) throw err;
      response.json({ success: true });
    });
});
recordRoutes.delete("/user/:id", function (req, response) {
  console.log(req.params);
  let id = { _id: ObjectId(req.params.id) };
  console.log(req.params.id);
  dbo
    .getDB()
    .collection("users")
    .deleteOne(id, function (err, res) {
      if (err) throw err;
      response.json({ success: true });
    });
});
recordRoutes.get("/user/:id", function (req, response) {
  let id = { _id: ObjectId(req.params.id) };
  dbo
    .getDB()
    .collection("users")
    .findOne(id, function (err, user) {
      if (err) throw err;
      response.json(user);
    });
});
// recordRoutes.put("/user", upload.single("file"), function (req, response) {
//   let id = { _id: ObjectId(req.body.id) };
//   const newValue = {
//     $set: {
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       username: req.body.username,
//       password: req.body.password,
//     },
//   };
//   dbo
//     .getDB()
//     .collection("users")
//     .updateOne(id, newValue, function (err, res) {
//       if (err) throw err;
//       response.json(res);
//     });
// });
// recordRoutes.post("/register", upload.single("avatar"), (req, res, next) => {
//   let filepath = "";
//   if (req.file) {
//     filepath = req.file.filename;
//   }
//   const user = {
//     fullname: req.body.fullname,
//     password: req.body.password,
//     avatar: filepath,
//     telephone: req.body.telephone,
//     email: req.body.email,
//   };
//   dbo
//     .getDB()
//     .collection("users")
//     .insertOne(user, function (err) {
//       if (err) throw err;
//       res.json(user);
//     });
// });

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
