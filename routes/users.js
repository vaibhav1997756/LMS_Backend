const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Registered", userId: result.insertId });
    }
  );
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM Users WHERE Email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.UserID, role: user.Role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  });
});

module.exports = router;
