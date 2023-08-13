const express = require("express");
const router = express.Router();
const authorize = require("../_middleware/authorize");
const service = require("../services/user.service");

router.get("/users", authorize(), getAll);
router.get("/user/:id", authorize(), getById);

router.post("/user", authorize(), create);
router.put("/user", authorize(), update);
router.delete("/user/:id", authorize(), deleteById);

module.exports = router;

function create(req, res, next) {
  const { firstname, lastname, username, password } = req.body;
  service
    .register({ firstname, lastname, username, password })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

function update(req, res, next) {
  const { id, firstName, lastName, username } = req.body;
  service
    .updateUserById({ id, firstName, lastName, username })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

function getAll(req, res, next) {
  service
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  // regular users can get their own record and admins can get any record
  if (req.params.id !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  service
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch(next);
}

function deleteById(req, res, next) {
  // regular users can get their own record and admins can get any record

  service
    .deleteById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch(next);
}
