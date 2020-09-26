const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createCategory,
  categoryList,
} = require("../controllers/categoryController");

// Create Category
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

// Category Lis
router.get("/", passport.authenticate("jwt", { session: false }), categoryList);

module.exports = router;
