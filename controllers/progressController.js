const { Progress } = require("../db/models");

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
      const newProgress = await req.goal.update(req.body);
      // REVIEW: you dont need to save the updated progress if you're not gonna use it
      const updatedProgress = await Progress.update(newProgress, {
        where: { goalId: req.goal.id },
      });
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
