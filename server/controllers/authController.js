const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dsfjaaserbuijdnafuirerssddfjnskfdsdkfsfnajsjner"; // Store securely in .env

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      // Login successful, now respond:
      res.status(201).json({ message: "User registered and logged in" });
    });
  } catch (error) {
    next(error); // handle errors properly
  }
};

module.exports.getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};
