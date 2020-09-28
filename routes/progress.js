const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  goalProgressUpdate,
  fetchProgress,
  progressList,
} = require("../controllers/progressController");

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

// Update Goal Progress
router.put(
  "/:goalId",
  passport.authenticate("jwt", { session: false }),
  goalProgressUpdate
);

router.get("/", progressList);

router.get("/:goalId", fetchProgress);

module.exports = router;
