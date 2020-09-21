const { Progress } = require("../db/models");

// make up your mind: goal or progress?
exports.fetchProgress = async (goalId, next) => {
  try {
    const goal = await Progress.findByPk(goalId);
    return goal;
  } catch (error) {
    next(error);
  }
};

exports.goalProgressUpdate = async (req, res, next) => {
  try {
    if (req.body) {
      // why are you updating the goal?
      const newProgress = await req.goal.update(req.body);
      // This line doesn't make any sense.
      const updatedProgress = await Progress.update(newProgress, {
        where: { goalId: req.goal.id },
      });
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
