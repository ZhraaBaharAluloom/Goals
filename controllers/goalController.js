const {
  Goal,
  Profile,
  Progress,
  Category,
  Tag,
  User,
} = require("../db/models");
const { create } = require("../db/models/Tag");

exports.fetchGoal = async (goalId, next) => {
  try {
    const goal = await Goal.findByPk(goalId);
    return goal;
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
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    const newGoal = await Goal.create({ ...req.body, ownerId: profile.id });

    await Progress.create({
      goalId: newGoal.id,
      profileId: profile.id,
    });

    const category = await Category.findOrCreate({
      where: { name: req.body.category },
    });

    req.body.tag ? (tagName = req.body.tag) : (tagName = req.body.category);

    await Tag.create({
      goalId: newGoal.id,
      catId: category[0].id,
      name: tagName,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    next(error);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const foundGoal = await Goal.findOne({
      where: { id: req.goal.id },
    });
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (foundGoal.ownerId === profile.id) {
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

exports.deleteGoal = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    const foundGoal = await Progress.findOne({
      where: { goalId: req.goal.id, profileId: profile.id },
    });

    foundGoal.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.followGoal = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    const newProgress = await Progress.create({
      goalId: req.goal.id,
      profileId: profile.id,
    });

    res.status(201).json(newProgress);
  } catch (error) {
    next(error);
  }
};
