const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/authController");

router.post("/register", controller.register);
router.post("/login", (req, res, next) => {
  console.log("Login attempt:", req.body.email); // Log the email trying to login

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed: Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during req.logIn:", err);
        return next(err);
      }
      console.log("User logged in successfully:", user._id);
      console.log("Session ID after login:", req.sessionID);
      console.log("Session data:", req.session);

      // At this point the cookie should be set on the response headers.
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

router.get("/me", controller.getCurrentUser);

module.exports = router;
