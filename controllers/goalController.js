const { Goal, Profile, Progress } = require("../db/models");

exports.fetchGoal = async (goalId, next) => {
  try {
    const goal = await Goal.findByPk(goalId);
    return goal;
  } catch (error) {
    next(error);
  }
};

exports.findGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.goal.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(goal);
  } catch (error) {
    next(error);
  }
};

exports.goalList = async (req, res, next) => {
  try {
    const goals = await Goal.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

exports.createGoal = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    const newGoal = await Goal.create(req.body);
    const newProgress = await Progress.create({
      goalId: newGoal.id,
      profileId: foundProfile.id,
    });
    res.status(201).json(newGoal);
  } catch (error) {
    next(error);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const foundGoal = await Progress.findOne({
      where: { goalId: req.goal.id },
    });
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (foundGoal.profileId === foundProfile.id) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.goal.update(req.body);
      res.status(201).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.followGoal = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    const foundGoal = await Goal.findByPk(req.goal.id);
    const newProgress = await Progress.create({
      goalId: foundGoal.id,
      profileId: foundProfile.id,
    });

    res.status(201).json(newProgress);
  } catch (error) {
    next(error);
  }
};
