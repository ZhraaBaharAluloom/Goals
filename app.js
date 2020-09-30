const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

//Routes import
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const goalRoutes = require("./routes/goal");
const progressRoutes = require("./routes/progress");
const categoryRoutes = require("./routes/category");
const commentRoutes = require("./routes/comments");

const tagRoutes = require("./routes/tag");


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
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes);
app.use("/tag", tagRoutes);


//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  // const PORT = process.env.PORT || 8000;

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
