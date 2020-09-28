const { Progress } = require("../db/models");

exports.fetchGoalProgress = async (req, res, next) => {
  try {
    const goals = await Progress.findAll({ where: { goalId: req.goal.id } });
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

exports.fetchProfileProgress = async (req, res, next) => {
  try {
    const profiles = await Progress.findAll({
      where: { profileId: req.profile.id },
    });
    res.json(profiles);
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
