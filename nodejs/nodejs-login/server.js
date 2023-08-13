const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, "secret-key");

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

// Protected route
app.get("/protected", (req, res) => {
  // Middleware to check for token
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Authentication failed." });
    }

    res.json({ message: "Protected content accessed." });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
