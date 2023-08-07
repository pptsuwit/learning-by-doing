const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John", refresh: null },
  { id: 2, name: "Tom", refresh: null },
  { id: 3, name: "Chris", refresh: null },
  { id: 4, name: "David", refresh: null },
];

const jwtGenerate = (user) => {
  const accessToken = jwt.sign({ name: user.name, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m", algorithm: "HS256" });

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign({ name: user.name, id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d", algorithm: "HS256" });

  return refreshToken;
};
const jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(error);
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);
    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(error);

      req.user = decoded;
      req.user.token = token;
      delete req.user.exp;
      delete req.user.iat;
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

app.get("/", jwtValidate, (req, res) => {
  res.send("Hello World!");
});
app.post("/auth/login", (req, res) => {
  const { name } = req.body;
  console.log(name);
  //find user
  const user = users.findIndex((e) => e.name === name);

  if (!name || user < 0) {
    return res.send(400);
  }

  const access_token = jwtGenerate(users[user]);
  const refresh_token = jwtRefreshTokenGenerate(users[user]);

  users[user].refresh = refresh_token;

  res.json({
    access_token,
    refresh_token,
  });
});
app.post("/auth/refresh", jwtRefreshTokenValidate, (req, res) => {
  const user = users.find((e) => e.id === req.user.id && e.name === req.user.name);

  const userIndex = users.findIndex((e) => e.refresh === req.user.token);

  if (!user || userIndex < 0) return res.sendStatus(401);

  const access_token = jwtGenerate(user);
  const refresh_token = jwtRefreshTokenGenerate(user);
  users[userIndex].refresh = refresh_token;

  return res.json({
    access_token,
    refresh_token,
  });
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
