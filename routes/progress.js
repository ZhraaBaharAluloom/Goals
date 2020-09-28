const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  goalProgressUpdate,
  fetchGoalProgress,
  fetchProfileProgress,
  progressList,
} = require("../controllers/progressController");

const { fetchGoal } = require("../controllers/goalController");
const { fetchProfile } = require("../controllers/profileController");

router.param("goalId", async (req, res, next, goalId) => {
  const goal = await fetchGoal(goalId, next);
  if (goal) {
    req.goal = goal;
    next();
  } else {
    const err = new Error("Goal is not found");
    err.status = 404;
    next(err);
  }
});

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile is not found");
    err.status = 404;
    next(err);
  }
});

// Update Goal Progress
router.put(
  "/:goalId",
  passport.authenticate("jwt", { session: false }),
  goalProgressUpdate
);

router.get("/goal/:goalId", fetchGoalProgress);

router.get("/profile/:profileId", fetchProfileProgress);

router.get("/", progressList);

module.exports = router;
