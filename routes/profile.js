const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  updateProfile,
  profileList,
} = require("../controllers/profileController");

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

router.get("/", profileList);

module.exports = router;
