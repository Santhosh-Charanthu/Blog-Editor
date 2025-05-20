const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const flash = require("connect-flash");
require("dotenv").config();

const app = express();

// CORS setup to allow frontend requests with cookies
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies to be sent
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");

    // Initialize MongoStore after DB connection
    const store = MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      crypto: {
        secret: process.env.SECRET,
      },
      touchAfter: 24 * 3600,
    });

    store.on("error", (err) => {
      console.log("ERROR in MONGO SESSION STORE", err);
    });

    const sessionOptions = {
      store,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "lax", // Change to 'none' and secure:true for production with HTTPS
        secure: false, // Set to true if using HTTPS in production
      },
    };

    // Setup sessions and passport middleware
    app.use(session(sessionOptions));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
      new LocalStrategy(
        { usernameField: "email" }, // <--- specify 'email' as username field
        User.authenticate()
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    });

    // Routes
    app.use("/api/blogs", blogRoutes);
    app.use("/api/auth", authRoutes);

    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
