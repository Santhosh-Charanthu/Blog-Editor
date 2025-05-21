const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/authController");

router.post("/register", controller.register);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

router.get("/me", controller.getCurrentUser);

module.exports = router;
