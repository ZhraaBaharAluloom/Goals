const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");
const {
  createGoal,
  fetchGoal,
  goalList,
  updateGoal,
  findGoal,
  followGoal,
} = require("../controllers/goalController");

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

// Goal List
router.get("/", goalList);

// Goal List
router.get("/:goalId", findGoal);

// Create new goal
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGoal
);

// Create new goal
router.put(
  "/:goalId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateGoal
);

router.post(
  "/:goalId",
  passport.authenticate("jwt", { session: false }),
  followGoal
);

module.exports = router;
