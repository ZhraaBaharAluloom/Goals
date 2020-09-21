const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createCategory } = require("../controllers/categoryController");

// Update Goal Progress
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

module.exports = router;
