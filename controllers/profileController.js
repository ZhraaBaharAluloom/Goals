const { Profile, User, Goal } = require("../db/models");
const Progress = require("../db/models/Progress"); // unused import

exports.updateProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    // no need for this condition
    if (req.user.id === foundProfile.userId) {
      await foundProfile.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.profileList = async (req, res, next) => {
  try {
    // is there a feature for viewing a list of profiles?
    const profile = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "firstName", "lastName"],
        },
        {
          model: Goal,
          attributes: ["id"],
        },
      ],
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
