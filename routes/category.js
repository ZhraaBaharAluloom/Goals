const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createCat } = require("../controllers/categoryController");

router.param("goalId", async (req, res, next, goalId) => {
  const goal = await fetchProgress(goalId, next);
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
router.post("/", passport.authenticate("jwt", { session: false }), createCat);

module.exports = router;
