const { Goal } = require("../db/models");

exports.fetchGoal = async (goalId, next) => {
  try {
    const goal = await Goal.findByPk(goalId);
    return goal;
  } catch (error) {
    console.log("exports.fetchGoal -> error", error);
  }
};

exports.goalList = async (req, res, next) => {
  try {
    const goals = await Goal.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(goals);
  } catch (error) {
    console.log("exports.goalList -> error", error);
  }
};

exports.createGoal = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newGoal = await Goal.create(req.body);
    res.status(201).json(newGoal);
  } catch (error) {
    console.log("exports.createGoal -> error", error);
  }
};
