const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");
const {
  createGoal,
  fetchGoal,
  goalList,
} = require("../controllers/goalController");

router.param("goalId", async (req, res, next, goalId) => {
  const goal = await fetchGoal(goalId, next);
  if (goal) {
    req.goal = goal;
    next();
  } else {
    const err = new Error("Trip is not found");
    err.status = 404;
    next(err);
  }
});

// Goal List
router.get("/", goalList);

// Create new goal
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createGoal
);

module.exports = router;
