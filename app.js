const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

//Routes import
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const goalRoutes = require("./routes/goal");
const progressRoutes = require("./routes/progress");

// Passport
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use(userRoutes);
app.use("/profile", profileRoutes);
app.use("/goals", goalRoutes);
app.use("/progress", progressRoutes);

const run = async () => {
  try {
    await db.sync({ force: true });
    console.log("connection to database successful");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
