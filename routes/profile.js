const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");

const {
  updateProfile,
  profileList,
  fetchUserProfile,
} = require("../controllers/profileController");

const { fetchUsers } = require("../controllers/userController");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUsers(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("User is not found");
    err.status = 404;
    next(err);
  }
});

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);

router.get("/user/:userId", fetchUserProfile);

router.get("/", profileList);

module.exports = router;
