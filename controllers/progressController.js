const { Progress } = require("../db/models");
const Goal = require("../db/models/Goal");

exports.fetchProgress = async (goalId, next) => {
  try {
    const goal = await Progress.findByPk(goalId);
    return goal;
  } catch (error) {
    next(error);
  }
};

exports.progressList = async (req, res, next) => {
  try {
    const progress = await Progress.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

exports.goalProgressUpdate = async (req, res, next) => {
  try {
    const foundProgress = await Progress.findOne({
      where: { goalId: req.goal.id },
    });
    await foundProgress.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
