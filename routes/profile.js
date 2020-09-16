const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");

const {
  updateProfile,
  profileList,
} = require("../controllers/profileController");

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);

router.get("/", profileList);

module.exports = router;
